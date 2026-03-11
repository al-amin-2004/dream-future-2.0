// ***** Code Flow This API ***** \\
// 1. Connect database
// 2. Get auth token from cookie
// 3. Verify JWT token
// 4. Check admin role permission
// 5. Get request body data
// 6. Check if user exists
// 7. Update user data
// 8. Return updated user response

import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PUT(request: Request) {
  try {
    await dbConnect();
    // Read token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
      role: string;
    };

    // Check admin role
    if (decoded.role !== "admin") {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    // Get body data
    const {
      userId,
      avatar,
      avatarId,
      firstName,
      lastName,
      username,
      email,
      number,
      nationality,
      address,
      gender,
      isVerifiedEmail,
      isVerifiedNumber,
      birthday,
    } = await request.json();

    // Check if user exists
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return Response.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          avatar,
          avatarId,
          firstName,
          lastName,
          username,
          email,
          number,
          nationality,
          address,
          gender,
          dob: birthday,
          isVerifiedEmail,
          isVerifiedNumber,
        },
      },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({
      ok: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
