const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const dateFormat = require("../helper/dateformate.helper");
const { JWT_AUTH_SECRET } = require("../keys/keys");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

exports.addDefaultAdmin = async () => {
  let isAdminExists = await User.findOne({
    email: "shreeji@yopmail.com",
  });
  if (isAdminExists) {
    console.log("Admin already exists...!!!");
  } else {
    let password = "Test@123";
    let email = "shreeji@yopmail.com";
    let auth_token = jwt.sign(
      {
        email: email,
      },
      JWT_AUTH_SECRET
    );
    let currentDateTime = dateFormat.setCurrentTimestamp();
    let userData = {
      email: email,
      first_name: "Admin",
      last_name: "Super",
      password: await bcrypt.hash(password, 10),
      created_at: currentDateTime,
      updated_at: currentDateTime,
      auth_token: auth_token,
    };
    await new User(userData).save();

    console.log("Admin created successfully...!");
    console.log("Admin data:", {
      company_email: userData.company_email,
      password: password,
      token: auth_token,
    });
  }
};
