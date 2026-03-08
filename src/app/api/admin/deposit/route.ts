// ***** Code flow this page for POST ******* \\
// 1. Get token from cookie
// 2. Decode token by JWT
// 3. Admin and Treasurer authorization check
// 4. Basic input validation
// 5. Amount check
// 6. Account existence check
// 7. Account status check
// 8. Deposit duplicate month check
// 9. Create transaction
// 10. Update account balance & totalDeposit

import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import TransactionModel from "@/models/Transaction";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    await dbConnect();

    /* ================= Admin and Treasurer AUTH ================= */
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      role: string;
      userId: string;
    };

    if (!["admin", "treasurer"].includes(decoded.role)) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    // ===== Basic input validation =====
    const { accountId, amount, month } = await req.json();
    if (!accountId || !amount || !month) {
      return Response.json(
        { ok: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (amount <= 0) {
      return Response.json(
        { ok: false, message: "Invalid deposit amount" },
        { status: 400 },
      );
    }

    // ===== Account existence check =====
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return Response.json(
        { ok: false, message: "Account not found" },
        { status: 404 },
      );
    }

    // ===== Account status check =====
    if (account.status === "block") {
      return Response.json(
        { ok: false, message: "Account is blocked" },
        { status: 400 },
      );
    }

    // ===== Duplicate month check =====
    const existingDeposit = await TransactionModel.findOne({
      accountId,
      month,
      transactionType: "deposit",
    });
    if (existingDeposit) {
      return Response.json(
        { ok: false, message: "Deposit already exists for this month" },
        { status: 409 },
      );
    }

    // ===== Create transaction =====
    const newBalance = account.balance + amount;
    await TransactionModel.create({
      accountId,
      amount,
      month,
      transactionType: "deposit",
      method: "cash",
      transactionDate: new Date(),
      processedBy: decoded.userId,
      newBalance,
    });

    // ===== Update account =====
    await AccountModel.findByIdAndUpdate(accountId, {
      $inc: {
        totalDeposit: amount,
        balance: amount,
      },
    });

    return Response.json(
      { ok: true, message: "Deposit successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
