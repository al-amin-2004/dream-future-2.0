import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        { ok: false, message: "No auth token" },
        { status: 401 },
      );
    }

    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };

    const user = await UserModel.findOne({ _id: decode.userId })
      .select("-password")
      .lean();

    if (!user) {
      return Response.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );
    }

    console.log(user);
    

    return Response.json({ ok: true, user });
  } catch (error) {
    console.error("me route error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
