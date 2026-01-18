import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req) {
  await connectDB();

  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await AuthUser.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const emailResponse = await sendVerificationEmail(email, user.name, otp);

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: "Failed to send OTP" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "OTP sent",
      email,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
