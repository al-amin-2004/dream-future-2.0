// ***** Code flow this page ******* \\
// 1. Input validate
// 2. User find from database
// 3. If email is verified
// 4. Compare password by bcrypt
// 5. Create auth token
// 6. Set auth token in cookie

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(reqeust: Request) {
  try {
    await dbConnect();

    const { email, password } = await reqeust.json();
    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find user from database
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return Response.json(
        { message: "Invalid user, Please signup first" },
        { status: 401 },
      );
    }

    // Check if email is verified
    if (!user.isVerifiedEmail) {
      return Response.json(
        { message: "Email is not verified, Please signup again" },
        { status: 403 },
      );
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return Response.json(
        { message: "Invalid credentials, Please try again" },
        { status: 401 },
      );
    }

    // Cookie set with JWT
    if (!jwtSecret) throw new Error("JWT_SECRET is not defiend!");
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "40d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 40 * 24 * 60 * 60,
      path: "/",
      priority: "high",
    });

    return Response.json(
      { success: true, message: "Login successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
