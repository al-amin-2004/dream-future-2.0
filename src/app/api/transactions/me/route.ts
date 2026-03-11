// ***** Code flow this page ***** \\
// 1. Connect database
// 2. Get accountId from query params
// 3. Get decoded form getAuthUserId
// 4. Find account by accountId
// 5. Check account belongs to this user
// 6. Fetch account transactions
// 7. Populate processor info (admin/treasurer)
// 8. Sort transactions by createdAt descending
// 9. Return formatted histories response

import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import TransactionModel from "@/models/Transaction";
import { getAuthUserId } from "@/helpers/getUserId";

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
    const auth = await getAuthUserId();
    if (!auth.ok) {
      return Response.json(
        { ok: false, message: auth.message },
        { status: auth.status },
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
    if (account.userId.toString() !== auth.decode?.userId) {
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
