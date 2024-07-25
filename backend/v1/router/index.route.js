const route = require("express").Router();
const UserRoute = require("./user.route");
const ProductRoute = require("./product.route");
const CartRoute = require("./cart.route");
const OrderRoute = require("./order.route");

route.use("/v1/user", UserRoute);
route.use("/v1/product", ProductRoute);
route.use("/v1/cart", CartRoute);
route.use("/v1/order", OrderRoute);

module.exports = route;
