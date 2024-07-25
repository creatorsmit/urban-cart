const express = require("express");
const route = express.Router();

const {
  createUser,
  getUserData,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} = require("../controller/user.controller");
const {
  user_validator,
  login_validator,
  forgot_validator,
  reset_validator,
} = require("../../validation/user.middleware");
const { validatorFunc } = require("../../helper/commonFunction.helper");
const authenticate = require("../../middleware/authenticate");

route
  .route("/")
  .post(user_validator, validatorFunc, createUser)
  .get(authenticate, getUserData);

route.route("/login").post(login_validator, validatorFunc, loginUser);
route
  .route("/forgot-password")
  .post(forgot_validator, validatorFunc, forgotPassword);
route
  .route("/reset-password")
  .post(reset_validator, validatorFunc, resetPassword);
route.route("/logout").get(authenticate, logoutUser);

module.exports = route;
