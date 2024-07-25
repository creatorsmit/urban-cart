const { EMAIL, EMAIL_PASS } = require("../keys/keys");
const nodemailer = require("nodemailer");

const sendMailAPI = async (to, subject, html) => {
  try {
    // Create a transporter with your SMTP configuration
    let transporter = nodemailer.createTransport({
      // Use for another platform service (Like hostinger email service etc.)
      //   host: process.env.HOST,
      //   port: process.env.EMAIL_PORT,
      //   secure: false, // true for 465, false for other ports

      service: "Gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: EMAIL,
      to: to,
      subject: subject,
      html: html,
    };
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = { sendMailAPI };
