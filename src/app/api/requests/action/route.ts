import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Request from "@/models/Request";
import Account from "@/models/Account";
import TransactionModel from "@/models/Transaction";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    /* ================= AUTH ================= */
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

    /* ================= DATA ================= */
    const { requestId, action } = await req.json();

    const requestData = await Request.findById(requestId);

    if (!requestData)
      return Response.json({ message: "Request not found" }, { status: 404 });

    /* ================= ACTION ================= */
    if (requestData.status !== "pending") {
      return Response.json(
        { ok: false, message: "Request already processed" },
        { status: 400 },
      );
    }

    if (action === "approve") {
      const updatedAccount = await Account.findByIdAndUpdate(
        requestData.accountId,
        {
          $inc: {
            totalDeposit: requestData.amount,
            balance: requestData.amount,
          },
        },
        { returnDocument: "after" },
      );

      requestData.status = "approved";
      requestData.processedBy = decoded.userId;

      /* ============ Create deposit data ================ */
      await TransactionModel.create({
        accountId: requestData.accountId,
        requestId: requestData._id,
        amount: requestData.amount,
        method: requestData.method,
        month: requestData.month,
        newBalance: updatedAccount?.balance,
        transactionType: requestData.requestType,
        processedBy: requestData.processedBy,
        transactionDate: new Date(),
      });
    }

    if (action === "reject") {
      requestData.status = "rejected";
      requestData.processedBy = decoded.userId;
    }

    requestData.processedAt = new Date();
    await requestData.save();

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Request action error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
