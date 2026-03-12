import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import ValidationModel from "@/models/OTPValidation";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    // Read new email from request
    const { userId, newEmail } = await request.json();
    if (!userId || !newEmail) {
      return Response.json(
        { success: false, message: "User ID and New Email are required" },
        { status: 400 },
      );
    }

    // Find user
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Check if new email already exists for another user
    const existingEmail = await UserModel.findOne({ email: newEmail });
    if (existingEmail) {
      return Response.json(
        { success: false, message: "This email is already in use" },
        { status: 400 },
      );
    }

    // Generate OTP for verification
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(verifyCode, 10);

    // Set expiry 5 minutes from now
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 2);

    // Store OTP in ValidationModel (upsert)
    await ValidationModel.create({
      userId,
      email: newEmail,
      verificationCode: hashedCode,
      expiresAt: expiryDate,
    });

    // Send OTP via email
    const emailResponse = await sendVerificationEmail(newEmail, verifyCode);
    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        userId,
        newEmail,
        message:
          "OTP sent to your new email. Please verify to complete the change.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error requesting email change!", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
