const CourseUpdateEmailTemplate = ({
  userName,
  courseTitle,
  lessonTitle,
  courseId,
}) => {
  return `
    <p>Hi ${userName || "Student"},</p>
    <p>A new lesson titled <strong>${lessonTitle}</strong> has been added to the course <strong>${courseTitle}</strong>.</p>
    <p>Check it out <a href="${process.env.NEXTAUTH_URL}/learning/${courseId}">here</a>.</p>
    <p>Happy Learning! </p>
  `;
};

export default CourseUpdateEmailTemplate;
