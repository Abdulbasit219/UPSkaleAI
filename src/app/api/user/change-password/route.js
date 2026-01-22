import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import NotificationSettings from "@/models/NotificationSettings";
import { sendSecurityAlertEmail } from "@/helpers/sendSecurityAlertEmail";

export async function PATCH(req) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user._id;
    const { currentPassword, newPassword, confirmPassword } = await req.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return Response.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const user = await AuthUser.findById(userId);

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return Response.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    const settings = await NotificationSettings.findOne({ userId });
    if (settings?.account?.securityAlerts) {
      await sendSecurityAlertEmail(user.email, user.username);
    }

    return Response.json({
      success: true,
      message: "Password updated successfully",
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
