const { body, query } = require("express-validator");

exports.user_validator = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.FIRSTNAME_REQUIRED")
    .trim(),
  body("last_name")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.LASTNAME_REQUIRED")
    .trim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.EMAIL_REQUIRED")
    .matches(
      /^([a-zA-Z0-9]+)([\-\_\.]*)([a-zA-Z0-9]*)([@])([a-zA-Z0-9]{2,})([\.][a-zA-Z]{2,3})$/
    )
    .withMessage("USER_VALIDATION.VALID_EMAIL")
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.PASSWORD_REQUIRED")
    .trim()
    .isLength({ min: 6 })
    .withMessage("USER_VALIDATION.PASSWORD_SIZE")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,}$/)
    .withMessage("USER_VALIDATION.PASSWORD_VALIDATION"),
];

exports.login_validator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.EMAIL_REQUIRED")
    .matches(
      /^([a-zA-Z0-9]+)([\-\_\.]*)([a-zA-Z0-9]*)([@])([a-zA-Z0-9]{2,})([\.][a-zA-Z]{2,3})$/
    )
    .withMessage("USER_VALIDATION.VALID_EMAIL")
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.PASSWORD_REQUIRED")
    .trim()
    .isLength({ min: 6 })
    .withMessage("USER_VALIDATION.PASSWORD_SIZE")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,}$/)
    .withMessage("USER_VALIDATION.PASSWORD_VALIDATION"),
];
exports.forgot_validator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.EMAIL_REQUIRED")
    .matches(
      /^([a-zA-Z0-9]+)([\-\_\.]*)([a-zA-Z0-9]*)([@])([a-zA-Z0-9]{2,})([\.][a-zA-Z]{2,3})$/
    )
    .withMessage("USER_VALIDATION.VALID_EMAIL")
    .trim(),
];
exports.reset_validator = [
  body("token")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.RESET_TOKEN_REQUIRED")
    .trim(),
  body("new_password")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.NEW_PASSWORD_REQUIRED")
    .trim()
    .isLength({ min: 6 })
    .withMessage("USER_VALIDATION.NEW_PASSWORD_SIZE")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,}$/)
    .withMessage("USER_VALIDATION.PASSWORD_VALIDATION"),
  body("confirm_new_password")
    .not()
    .isEmpty()
    .withMessage("USER_VALIDATION.CONFIRM_PASSWORD_REQUIRED")
    .trim()
    .isLength({ min: 6 })
    .withMessage("USER_VALIDATION.CONFIRM_PASSWORD_SIZE")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,}$/)
    .withMessage("USER_VALIDATION.PASSWORD_VALIDATION")
    .custom((value, { req }) => {
      if (value !== req.body.new_password) {
        throw new Error("USER_VALIDATION.NEW_OLD_PASSWORD_VALIDATION");
      }
      return true;
    }),
];
