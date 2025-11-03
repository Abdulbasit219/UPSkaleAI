export const VerificationEmailTemplate = (username, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <title>Verification Code</title>
  </head>
  <body style="font-family: Roboto, Verdana, sans-serif; background-color: #f7f7f7; padding: 20px;">
    <div style="max-width: 600px; background: #fff; padding: 25px; margin: auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Hello ${username},</h2>

      <p style="font-size: 16px; color: #555;">
        Thank you for registering. Please use the following verification code to complete your registration:
      </p>

      <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #007BFF; text-align: center; margin: 30px 0;">
        ${otp}
      </p>

      <p style="font-size: 14px; color: #777;">
        If you did not request this code, please ignore this email.
      </p>
    </div>
  </body>
  </html>
  `;
};
