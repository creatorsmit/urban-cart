const express = require("express");
const {
  getAllProduct,
  addProduct,
  getByIdProduct,
} = require("../controller/product.controller");
const route = express.Router();

const authenticate = require("../../middleware/authenticate");

route.route("/").get(getAllProduct).post(addProduct);
route.route("/:id").get(authenticate, getByIdProduct);

module.exports = route;
