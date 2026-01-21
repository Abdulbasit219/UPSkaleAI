import { transporter } from "@/lib/nodemailer";
import { SecurityAlertEmailTemplate } from "../../emails/SecurityAlertEmailTemplate";

export async function sendSecurityAlertEmail(email, username) {
  try {
    const html = SecurityAlertEmailTemplate(username);

    await transporter.sendMail({
      from: `"UpScaleAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Security Alert: Password Changed",
      html,
    });

    return { success: true, message: "Security alert email sent." };
  } catch (error) {
    console.error("Error sending security alert email:", error);
    return { success: false, message: "Failed to send security alert email." };
  }
}
