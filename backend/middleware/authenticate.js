const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const constants = require("../config/constants");
const { sendResponse } = require("../services/common.services");
const { JWT_AUTH_SECRET } = require("../keys/keys");

// authenticate user
let authenticate = async (req, res, next) => {
  try {
    if (!req.header("Authorization") && !req.header("token")) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.UNAUTHORIZED,
        constants.STATUS_CODE.UNAUTHENTICATED,
        "GENERAL.UNAUTHORIZED_USER",
        null,
        req.headers.lang
      );
    }

    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.header("token")?.replace("Bearer ", "");

    if (!token)
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.FAIL,
        "GENERAL.NOT_TOKEN",
        null,
        req.headers.lang
      );

    const decoded = jwt.verify(token, JWT_AUTH_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      auth_token: token,
      deleted_at: null,
    }).lean();
    if (!user)
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.UNAUTHORIZED,
        constants.STATUS_CODE.UNAUTHENTICATED,
        "GENERAL.UNAUTHORIZED_USER",
        null,
        req.headers.lang
      );

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log("Error(authenticate): ", err);

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
      err,
      req.headers.lang
    );
  }
};

module.exports = authenticate;
