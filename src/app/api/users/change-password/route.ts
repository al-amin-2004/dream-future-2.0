// ***** Code flow this page ******* \\
// 1. DB connect
// 2. Get decoded form getAuthUserId
// 3. Match both password are equal
// 4. User find
// 5. Current password match check
// 6. New password hash
// 7. Password update
// 8. Response return

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { getAuthUserId } from "@/helpers/getUserId";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const auth = await getAuthUserId();
    if (!auth.ok) {
      return Response.json(
        { ok: false, message: auth.message },
        { status: auth.status },
      );
    }

    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return Response.json(
        { ok: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    if (currentPassword === newPassword) {
      return Response.json(
        { ok: false, message: "New password must be different" },
        { status: 400 },
      );
    }

    const user = await UserModel.findById(auth.decode?.userId);
    if (!user) {
      return Response.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return Response.json(
        { ok: false, message: "Current password is incorrect" },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return Response.json(
      { ok: true, message: "Password updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { ok: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
