const authenticate = require("../../middleware/authenticate");
const {
  createOrder,
  varifyOrder,
  getOrderDetails,
} = require("../controller/order.controller");

const route = require("express").Router();
route.use(authenticate);

route.route("/").post(createOrder).get(getOrderDetails);
route.route("/varifyOrder").post(varifyOrder);

module.exports = route;
