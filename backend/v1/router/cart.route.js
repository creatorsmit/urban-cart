const route = require("express").Router();

const authenticate = require("../../middleware/authenticate");
const { cart_validator } = require("../../validation/cart.middleware");
const {
  getAllCart,
  getByIdCart,
  addCart,
  removeCartProduct,
} = require("../controller/cart.controller");
const { validatorFunc } = require("../../helper/commonFunction.helper");

route.use(authenticate);
route.route("/").get(getAllCart).post(cart_validator, validatorFunc, addCart);
route.route("/:id").get(getByIdCart).delete(removeCartProduct);
// route.route("/addRemove/:id").post(addCart);

module.exports = route;
