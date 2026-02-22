import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "OTP for Dream-Future",
      html: `
        <div style="font-family: sans-serif;">
          <h2>Your OTP Code</h2>
          <p style="font-size: 20px; font-weight: bold;">${code}</p>
          <p>This code will expire in 2 minute.</p>
        </div>
      `,
    });

    return { success: true, message: "Verification email send successfully" };
  } catch (error) {
    console.error("Error sending verification email", error);
    return { success: false, message: "Faild to send verification email" };
  }
};
