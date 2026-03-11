// ***** Code flow this page ******* \\
// 1. Get decoded form getAuthUserId
// 2. Get Accounts from database

import { getAuthUserId } from "@/helpers/getUserId";
import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";

export async function GET() {
  try {
    await dbConnect();

    const auth = await getAuthUserId();
    if (!auth.ok) {
      return Response.json(
        { ok: false, message: auth.message },
        { status: auth.status },
      );
    }

    const accounts = await AccountModel.find({ userId: auth.decode?.userId })
      .sort({ createdAt: 1 })
      .lean();

    if (accounts.length === 0) {
      return Response.json(
        { ok: false, message: "account not found" },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, accounts });
  } catch (error) {
    console.error("accounts route error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
