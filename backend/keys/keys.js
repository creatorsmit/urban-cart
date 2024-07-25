require("dotenv").config();
module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  BASEURL: process.env.BASEURL,
  PORT: process.env.PORT || 3000,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_POST: process.env.EMAIL_POST,
  EMAIL: process.env.EMAIL,
  EMAIL_PASS: process.env.EMAIL_PASS,
  RZP_KEY_ID: process.env.RZP_KEY_ID,
  RZP_KEY_SECRET: process.env.RZP_KEY_SECRET,
  SWAGGER_BASE_URL: process.env.SWAGGER_BASE_URL,
  JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
  SWAGGER_SERVER_URL: process.env.SWAGGER_SERVER_URL,
  SERVER_CONFIG: {
    CORS: {
      allowedHosts: [
        // "http://localhost:3000", // local
        "*",
      ],
    },
  },
};
