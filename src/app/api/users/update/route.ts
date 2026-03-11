// ***** Code flow this page ******* \\
// 1. Besic inputs validation
// 2. Get decoded form getAuthUserId
// 3. Find by id and update user

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getAuthUserId } from "@/helpers/getUserId";

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

    const auth = await getAuthUserId();
    if (!auth.ok) {
      return Response.json(
        { ok: false, message: auth.message },
        { status: auth.status },
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      auth.decode?.userId,
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
