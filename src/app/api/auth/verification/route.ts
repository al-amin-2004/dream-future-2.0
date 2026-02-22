// ***** Code flow this page ******* \\
// 1. Input validate
// 2. User find
// 3. Already verified check
// 4. OTP find
// 5. Expiry check
// 6. bcrypt compare
// 7. Update user
// 8. Delete OTP

import dbConnect from "@/lib/dbConnect";
import ValidationModel from "@/models/OTPValidation";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // bring userId, verify code from varification page
    const { userId, otp } = await req.json();
    if (!userId || !otp) {
      return Response.json(
        { success: false, message: "UserId and OTP are required." },
        { status: 400 },
      );
    }

    // find user in databse with userId
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 },
      );
    }

    // check, is user already verified
    if (user.isVerifiedEmail) {
      return Response.json(
        { success: false, message: "Email already verified." },
        { status: 400 },
      );
    }

    // find otpData in database with userId
    const otpData = await ValidationModel.findOne({
      userId,
    });
    if (!otpData) {
      return Response.json(
        { success: false, message: "No verification record found." },
        { status: 404 },
      );
    }

    // Expiry check at otpData
    if (otpData.expiresAt < new Date()) {
      return Response.json(
        { success: false, message: "OTP expired. Please request again." },
        { status: 400 },
      );
    }

    // Matching otp for verify
    const isMatch = await bcrypt.compare(otp, otpData.verificationCode);
    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid verification OTP." },
        { status: 400 },
      );
    }

    // if otp matched, email verify true
    user.isVerifiedEmail = true;
    await user.save();

    // Delete OTP record
    await ValidationModel.deleteOne({ userId });

    return Response.json(
      { success: true, message: "Email verified successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verification error:", error);
    return Response.json(
      { success: false, message: "Server error." },
      { status: 500 },
    );
  }
}
