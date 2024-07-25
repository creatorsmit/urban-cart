
const { EMAIL, BASEURL } = require("../../keys/keys");

const preparedForgotPasswordTemplate = (options) => {
  const { token, User } = { ...(options || {}) };
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
             width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        }
        .logo {
            display: block;
            margin: 0 auto;
            width: 150px;
        }
        .social-links {
            margin-top: 20px;
            text-align: center;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
        }
    </style>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    "
  >
    <div
      style="
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      "
    >
      <div
        style="
          background-color: #ad274f;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        "
      >
        <h1>Password Reset</h1>
      </div>
      <div style="padding: 20px">
        <p>Dear ${User},</p>
        <p>
          We hope this email finds you well. It seems like you've forgotten your
          password for MooxTicket. No worries – we're here to help you get back
          on track!
        </p>
        <p>
          <strong
            >To reset your password, please follow these simple steps:</strong
          >
        </p>
        <ol>
          <li>Click on the Password Reset Link:</li>
          <a
            href="${BASEURL}/reset-password?token=${token}"
            style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #ad274f;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            "
            >Reset Password</a
          >
          <li>
            Verify Your Identity: You may be asked to verify your identity for
            security purposes. Follow the on-screen instructions to proceed.
          </li>
          <li>
            Create a New Password: Choose a strong and secure password. Make
            sure it includes a mix of uppercase and lowercase letters, numbers,
            and special characters.
          </li>
          <li>
            Log In: Once your password is reset, head back to
            <a href=${BASEURL} style="color: #ad274f"
              >MooxTicket</a
            >
            and log in using your email address and the new password.
          </li>
        </ol>
        <p>
          If you did not request this password reset or if you have any concerns
          about the security of your account, please contact our support team
          immediately at
          <a href="mailto:${EMAIL}" style="color: #ad274f"
            >${EMAIL}</a
          >.
        </p>
        <p>Thank you for using MooxTicket. We're excited to have you back!</p>
      </div>
      <div style="background-color: #f2f2f2; padding: 20px; text-align: center">
        <p>Best regards,<br />The NodeJS Team</p>
       </div>
    </div>
  </body>
</html>
    `;
};

module.exports = { preparedForgotPasswordTemplate };
