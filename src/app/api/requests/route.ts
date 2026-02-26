// ***** Code flow this page ******* \\
// 1. Besic input validation
// 2. Payment method validation
// 3. Request Type validation
// 4. Get token from cookie for user id
// 5. Decode token by JWT
// 6. Account ownership check
// 7. Account status check
// 8. Deposit duplicate month check
// 9. Withdraw balance check
// 10. Create Request

import { paymentMethods, requestTypes } from "@/constants/request";
import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import RequestModel from "@/models/Request";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { accountId, month, amount, method, transactionId, requestType } =
      await request.json();

    if (
      !accountId ||
      !month ||
      !amount ||
      !method ||
      !transactionId ||
      !requestType
    ) {
      return Response.json(
        {
          success: false,
          message:
            "accountId, amount, month, method and transactionId are required.",
        },
        { status: 400 },
      );
    }

    // Payment method validation
    if (!paymentMethods.includes(method)) {
      return Response.json(
        { message: "Invalid payment method" },
        { status: 400 },
      );
    }

    // Request Type validation
    if (!requestTypes.includes(requestType)) {
      return Response.json(
        { message: "Invalid request type" },
        { status: 400 },
      );
    }

    // Get user id
    const cookieStorage = await cookies();
    const token = cookieStorage.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        { ok: false, message: "No auth token" },
        { status: 401 },
      );
    }

    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };

    // Account ownership check
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return Response.json({ message: "Account not found" }, { status: 404 });
    }
    if (account.userId.toString() !== decode.userId) {
      return Response.json({ message: "Access denied" }, { status: 403 });
    }

    // Account status check
    if (account.status === "block") {
      return Response.json(
        { message: "Account is blocked. Cannot make requests." },
        { status: 403 },
      );
    }

    // Deposit duplicate month check
    if (requestType === "deposit") {
      const existing = await RequestModel.findOne({
        accountId,
        month,
        requestType: "deposit",
        status: { $ne: "rejected" },
      });

      if (existing) {
        return Response.json(
          { message: "Deposit already requested for this month" },
          { status: 400 },
        );
      }
    }

    // Withdraw balance check
    if (requestType === "withdraw") {
      if (account.balance < amount) {
        return Response.json(
          { message: "Insufficient balance" },
          { status: 400 },
        );
      }
    }

    await RequestModel.create({
      accountId,
      requestType,
      month,
      amount,
      method,
      transactionId,
      status: "pending",
    });

    return Response.json(
      { success: true, message: "Request send successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
