import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import bcrypt from "bcryptjs";

export async function PATCH(req) {
  await connectDB();

  try {
    const { email, otp, newPassword } = await req.json();
    console.log(email, otp, newPassword)

    if (!email || !otp || !newPassword) {
      return Response.json(
        { success: false, message: "All fields are required" },
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

    // validate OTP
    if (
      user.resetPasswordOTP !== otp ||
      user.resetPasswordOTPExpiry < new Date()
    ) {
      return Response.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // clear reset otp
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpiry = null;

    await user.save();

    return Response.json({
      success: true,
      message: "Password reset successfully",
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
