import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const {
      firstName,
      lastName,
      number,
      gender,
      nationality,
      birthday,
      address,
      avatar,
      avatarId,
    } = await request.json();

    // Read Token
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        { ok: false, message: "No auth token" },
        { status: 401 },
      );
    }

    // Decode token
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      decode.userId,
      {
        $set: {
          firstName,
          lastName,
          number,
          gender,
          nationality,
          address,
          dob: birthday,
          avatar,
          avatarId,
        },
      },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return Response.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json({
      ok: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("user/update error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
