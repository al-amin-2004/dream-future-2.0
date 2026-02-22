import { generateUniqueUsername } from "@/helpers/generateUsername";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import ValidationModel from "@/models/OTPValidation";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { firstName, lastName, email, password } = await request.json();

    const username = await generateUniqueUsername(firstName, lastName);
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(verifyCode, 10);
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 2);

    const existingEmail = await UserModel.findOne({ email });

    let userId;

    if (existingEmail) {
      if (existingEmail.isVerifiedEmail) {
        return Response.json(
          { success: false, message: "User already exist with this email." },
          { status: 400 },
        );
      } else {
        existingEmail.password = hashedPassword;
        await existingEmail.save();

        userId = existingEmail._id;

        await ValidationModel.findOneAndUpdate(
          { userId: existingEmail._id },
          {
            verificationCode: hashedCode,
            expiresAt: expiryDate,
          },
          { upsert: true, new: true },
        );
      }
    } else {
      const createNewUser = await UserModel.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });

      userId = createNewUser._id;

      await ValidationModel.create({
        userId: createNewUser._id,
        verificationCode: hashedCode,
        expiresAt: expiryDate,
      });
    }

    // Send Verify Email
    const emailRespons = await sendVerificationEmail(email, verifyCode);

    if (!emailRespons.success) {
      return Response.json(
        { success: false, message: emailRespons.message },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        userId,
        email,
        message: "Sending an OTP. Please verify your email.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user!", error);
    return Response.json(
      { success: false, message: "Error registering user!" },
      { status: 500 },
    );
  }
}
