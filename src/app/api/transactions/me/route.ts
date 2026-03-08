// ***** Code flow this page ***** \\
// 1. Connect database
// 2. Get accountId from query params
// 3. Get auth token from cookies
// 4. Verify and decode JWT token
// 5. Find account by accountId
// 6. Check account belongs to this user
// 7. Fetch account transactions
// 8. Populate processor info (admin/treasurer)
// 9. Sort transactions by createdAt descending
// 10. Return formatted histories response

import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

import AccountModel from "@/models/Account";
import TransactionModel from "@/models/Transaction";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Get active account ID
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return Response.json(
        { ok: false, message: "Account id required" },
        { status: 400 },
      );
    }

    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return Response.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Verify and decode JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };
    if (!decoded) {
      return Response.json(
        { ok: false, message: "Invalid token" },
        { status: 401 },
      );
    }

    // ===== Account ownership check =====
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return Response.json(
        { ok: false, message: "Account not found" },
        { status: 404 },
      );
    }

    // Check account belongs to this user
    if (account.userId.toString() !== decoded.userId) {
      return Response.json(
        { ok: false, message: "Access denied" },
        { status: 403 },
      );
    }

    // ===== Fetch account Transactions =====
    const histories = await TransactionModel.find({
      accountId,
    })
      .populate("processedBy", "firstName lastName username")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      ok: true,
      histories,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
