export const SecurityAlertEmailTemplate = (username) => {
  return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <title>Security Alert</title>
</head>
<body style="font-family: Roboto, Verdana, sans-serif; background-color: #f7f7f7; padding: 20px;">
  <div style="max-width: 600px; background: #fff; padding: 25px; margin: auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h2 style="color: #333;">Hello ${username},</h2>

    <p style="font-size: 16px; color: #555;">
      Your account password has been successfully changed.
    </p>

    <p style="font-size: 14px; color: #777;">
      If you did not make this change, please reset your password immediately or contact support.
    </p>
  </div>
</body>
</html>
`;
};
