// ***** Code flow this page ******* \\
// 1. Get decoded form getAuthUserId
// 2. Get user from database

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getAuthUserId } from "@/helpers/getUserId";

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

    const user = await UserModel.findOne({ _id: auth.decode?.userId })
      .select("-password")
      .lean();

    if (!user) {
      return Response.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, user });
  } catch (error) {
    console.error("me route error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
