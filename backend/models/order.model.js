const mongoose = require("mongoose");
const dateFormat = require("../helper/dateformate.helper");

const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  order_id: {
    type: String,
  },
  is_cancel: { type: Boolean, default: false },
  order_date: { type: String },
  payment_method: { type: String, default: "" },
  pay_id: {
    type: String,
    default: "",
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  order_status: {
    type: String,
  },
  created_at: {
    type: Number,
  },
  updated_at: {
    type: Number,
  },
});

orderSchema.pre("save", function (next) {
  if (!this.created_at && !this.joining_date) {
    this.created_at = dateFormat.setCurrentTimestamp();
  }
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

orderSchema.pre("insertMany", function (next, docs) {
  docs.map(function (x) {
    if (!x.created_at) x.created_at = dateFormat.setCurrentTimestamp();
    x.updated_at = dateFormat.setCurrentTimestamp();
  });
  next();
});

orderSchema.pre("update", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

orderSchema.pre("updateOne", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

orderSchema.pre("updateMany", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

orderSchema.pre("findOneAndUpdate", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
