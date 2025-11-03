import { transporter } from "@/lib/nodemailer.js";
import { VerificationEmailTemplate } from "../../emails/VerificationEmailTemplate";

export async function sendVerificationEmail(email, username, verifyCode) {
  try {
    const emailHtml = VerificationEmailTemplate(username, verifyCode);

    await transporter.sendMail({
      from: `"AI Coding Assistant" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "AI Coding Assistant Verification Code",
      html: emailHtml,
    });

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
