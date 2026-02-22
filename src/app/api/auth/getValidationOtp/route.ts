import dbConnect from "@/lib/dbConnect";
import ValidationModel from "@/models/OTPValidation";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { userId } = await request.json();
    if (!userId) {
      return Response.json(
        { success: false, message: "UserID not found." },
        { status: 404 },
      );
    }

    const user = await UserModel.findById( userId );
    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 },
      );
    }

    const otpData = await ValidationModel.findOne({ userId });
    if (!otpData) {
      return Response.json(
        { success: false, message: "OTP Data not found." },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        email: user.email,
        expiresAt: otpData.expiresAt,
        message: "otpData get successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error.", error },
      { status: 500 },
    );
  }
}
