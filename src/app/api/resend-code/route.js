import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request) {
  await connectDB();

  try {
    const { username } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await AuthUser.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return Response.json(
        { success: false, message: "User is already verified" },
        { status: 400 }
      );
    }

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const emailResponse = await sendVerificationEmail(
      user.email,
      user.name,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: "Verification code sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resending code:", error);
    return Response.json(
      { success: false, message: "Error resending code" },
      { status: 500 }
    );
  }
}
