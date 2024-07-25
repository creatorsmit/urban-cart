const User = require("../../models/user.model");
const { ObjectId } = require("mongodb");
const constants = require("../../config/constants");
const { getUser } = require("../services/user.services");
const {
  sendResponse,
  capitalizeFirstLetter,
  capitalizeFirstLetterUsingRegex,
} = require("../../services/common.services");
const jwt = require("jsonwebtoken");
const { sendMailAPI } = require("../../helper/email.helper");

const bcrypt = require("bcryptjs");
const { JWT_AUTH_SECRET } = require("../../keys/keys");
const {
  preparedForgotPasswordTemplate,
} = require("../../views/emails/forgotPasswordTemplate");

const createUser = async (req, res, next) => {
  try {
    const reqBody = req.body;

    let existingUser = await getUser(reqBody.email, "email");
    if (existingUser) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.FAIL,
        "USER.EMAIL_ALREDAY_EXIST",
        null,
        req.headers.lang
      );
    }
    reqBody.first_name = capitalizeFirstLetter(reqBody.first_name);
    reqBody.last_name = capitalizeFirstLetter(reqBody.last_name);
    reqBody.password = await bcrypt.hash(reqBody.password, 10);

    let userData = await User.create({ ...reqBody });

    await userData.generateAuthToken();
    let user = userData.toObject();
    delete user.password;
    delete user.reset_token;
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.CREATED,
      constants.STATUS_CODE.SUCCESS,
      "USER.SIGNUP_SUCCESS",
      user,
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(CreateUser)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const loginUser = async (req, res, next) => {
  try {
    const reqBody = req.body;

    let existingUser = await User.findByCredentials(
      reqBody.email,
      reqBody.password
    );

    if (existingUser === 1) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.FAIL,
        "USER.USERDETAIL_NOT_AVAILABLE",
        null,
        req.headers.lang
      );
    }
    if (existingUser === 2) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.FAIL,
        "USER.INVALIDPASSWORD",
        null,
        req.headers.lang
      );
    }

    await existingUser.generateAuthToken();

    let user = existingUser.toObject();
    delete user.password;
    delete user.reset_token;

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "USER.LOGIN_SUCCESS",
      user,
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(loginUser)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    let reqBody = req.body;
    let existingUser = await getUser(reqBody.email, "email");

    if (!existingUser) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.FAIL,
        "USER.USERDETAIL_NOT_AVAILABLE",
        null,
        req.headers.lang
      );
    }

    const resetToken = jwt.sign(
      {
        email: existingUser.email,
      },
      JWT_AUTH_SECRET,
      { expiresIn: constants.REFRESH_TOKEN_EXPIRE_TIME }
    );

    existingUser.reset_token = resetToken;
    await existingUser.save();

    // send email for reset password
    const html = preparedForgotPasswordTemplate({
      token: resetToken,
      User: existingUser.first_name,
    });

    await sendMailAPI(existingUser.email, "Forgot Password", html);

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "USER.FORGOTEMAILSEND",
      null,
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(forgotPassword)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const resetPassword = async (req, res, next) => {
  try {
    let reqBody = req.body;
    const decoded = jwt.verify(reqBody.token, JWT_AUTH_SECRET);

    let existingUser = await getUser(decoded.email, "email");
    if (!existingUser) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.FAIL,
        "USER.USERDETAIL_NOT_AVAILABLE",
        null,
        req.headers.lang
      );
    }
    existingUser.password = await bcrypt.hash(reqBody.new_password, 10);
    await existingUser.save();
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "USER.RESETPASSWORD_SUCCESS",
      null,
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(resetPassword)..", err);

    if (err.message == constants.JWT_EXPIRED_MESSAGE) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.UNAUTHORIZED,
        constants.STATUS_CODE.UNAUTHENTICATED,
        "GENERAL.JWT_EXPIRED",
        null,
        req.headers.lang
      );
    }

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const getUserData = async (req, res, next) => {
  try {
    let { limit, page, sortBy, search } = req.query;
    limit = +limit || constants.LIMIT;
    page = +page || constants.PAGE;

    let query = {};
    let field = "created_at",
      value = 1;
    if (sortBy) {
      const parts = sortBy.split(":");
      field = parts[0];
      parts[1] === "desc" ? (value = -1) : (value = 1);
    }
    if (search) {
      query.$or = [
        { email: new RegExp(search, "i") },
        { first_name: new RegExp(search, "i") },
        { last_name: new RegExp(search, "i") },
      ];
    }
    const total = await User.countDocuments();

    if (total === 0) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        "GENERAL.GET_LIST",
        { data: null, total, limit, page },
        req.headers.lang
      );
    }

    const user = await User.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ [field]: value });

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "GENERAL.GET_LIST",
      { data: user, total, limit, page },
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(getUserData)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const logoutUser = async (req, res, next) => {
  try {
  } catch (err) {
    console.log("Error(logoutUser)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

module.exports = {
  createUser,
  getUserData,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
};
