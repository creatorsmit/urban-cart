const { body, query } = require("express-validator");

exports.cart_validator = [
  body("product_id")
    .not()
    .isEmpty()
    .withMessage("CART_VALIDATION.PRODUCT_ID_REQUIRED")
    .trim()
    .isMongoId()
    .withMessage("CART_VALIDATION.VALID_PRODUCT_ID"),
  body("quantity")
    .not()
    .isEmpty()
    .withMessage("CART_VALIDATION.QUANTITY_REQUIRED")
    .trim()
    .isInt({ min: 1 })
    .withMessage("CART_VALIDATION.QUANTITY_VALID"),
];
