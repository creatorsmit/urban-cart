const { validationResult } = require("express-validator");

const {
  sendResponseValidation,
  responseIn,
} = require("../services/common.services");

const constant = require("../config/constants");
const Keys = require("../keys/keys");

// show validation error message
const validatorFunc = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("VALIDATION....", errors.array()[0].msg);
    return sendResponseValidation(
      res,
      constant.WEB_STATUS_CODE.BAD_REQUEST,
      constant.STATUS_CODE.VALIDATION,
      errors.array()[0].msg,
      {},
      req.headers.lang,
      {}
    );
  }
  next();
};

const validatorFuncRender = (req, res, next) => {
  let errArray = {};
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors....", errors);

    errMessage = responseIn(errors.array()[0].msg, req.headers.lang);

    let message = req.flash("error", errMessage);

    return res.redirect(
      Keys.BASEURL +
        "v1/web/reset-password?token=" +
        req.body.reset_password_token
    );
  }
  next();
};

module.exports = {
  validatorFunc,
  validatorFuncRender,
};
