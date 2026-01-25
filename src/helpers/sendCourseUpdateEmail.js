import { transporter } from "@/lib/nodemailer";
import CourseUpdateEmailTemplate from "../../emails/CourseUpdateEmailTemplate";

export async function sendCourseUpdateEmail(email, userName, courseTitle, lessonTitle, courseId) {
  try {
    const html = CourseUpdateEmailTemplate({ userName, courseTitle, lessonTitle, courseId });

    await transporter.sendMail({
      from: `"UpScaleAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `New Lesson Added: ${lessonTitle}`,
      html,
    });

    return { success: true, message: "Course update email sent." };
  } catch (error) {
    console.error("Error sending course update email:", error);
    return { success: false, message: "Failed to send course update email." };
  }
}
