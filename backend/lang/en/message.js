module.exports = {
  // add messages over here
  // controller messgaes
  GENERAL: {
    GENERAL_ERROR_CONTENT: "Something went wrong. Please try again later.",
    UNAUTHORIZED_USER: "Unauthorized, please login.",
    RESTRICTED_USER: "You are not authorized to do this operation.",
    INVALID_LOGIN: "You are not authorized.",
    BLACKLIST_MAIL: `Please enter a valid email, we don't allow dummy emails.`,
    INVALID_IMAGE: "Please upload valid image.",
    INVALID_ID: "Please enter valid id.",
    INVALID_DOC: "Please upload document.",
    GET_LIST: "Get list successfully.",
    NOT_FOUND: "List not found.",
    NOT_TOKEN: "Token not found.",
    JWT_EXPIRED: "JWT is expired, Please login again.",
    PASSWORD_NOT_ALLOW: "Password can not be edit by user.",
    ROUTE_NOT_FOUND: "404 :Request route not found",
  },

  USER: {
    EMAIL_ALREDAY_EXIST: "This email is already exist in this App.",
    LOGIN_SUCCESS: "Login successfully.",
    SIGNUP_SUCCESS: "User Created successfully.",
    LOGOUT_SUCCESS: "Logout successfully.",
    LOGOUT_FAIL: "Error while logging you out.",
    RESETPASSWORD_SUCCESS: "Your password has been updated successfully.",
    FORGOTPASSWORD_SUCCESS: "Your password has been updated successfully.",
    USERDETAIL_NOT_AVAILABLE: "User details not found.",
    INVALIDOLDPASSWORD: "Please enter valid current password.",
    INVALIDPASSWORD: "Incorrect password.",
    PASSWORDMINLENGTH: "Your password must contain at least 6 characters.",
    FORGOTEMAILSEND: "Forgot email send successfully.",
  },
  PRODUCT: {
    PRODUCT_NOT_FOUND: "Product not found.",
    ALREADY_EXIST: "Product already added.",
    PRODUCT_ADD: "Product added to cart.",
    PRODUCT_REMOVE: "Product remove from cart.",
  },

  CART: {
    CART_NOT_FOUND: "Cart not found.",
    ORDER_PLACED: "Your order already placed.",
    ORDER_CREATED: "Order created successfully.",
    ORDER_PLACED: "Order placed successfully.",
    ORDER_FAIL: "Order cancel successfully.",
    SIGN_INVALID: "Payment signature is incorrect.",
  },
};
