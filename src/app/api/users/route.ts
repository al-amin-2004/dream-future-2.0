import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const users = await UserModel.find({}).select("-password").lean();
    return Response.json({ ok: true, users });
  } catch (error) {
    console.error("users api route error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
