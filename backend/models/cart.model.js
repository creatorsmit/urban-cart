const mongoose = require("mongoose");
const dateFormat = require("../helper/dateformate.helper");

const cartSchema = new mongoose.Schema({
  product: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  order_placed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Number,
  },
  updated_at: {
    type: Number,
  },
});

cartSchema.pre("save", function (next) {
  if (!this.created_at && !this.joining_date) {
    this.created_at = dateFormat.setCurrentTimestamp();
  }
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

cartSchema.pre("insertMany", function (next, docs) {
  docs.map(function (x) {
    if (!x.created_at) x.created_at = dateFormat.setCurrentTimestamp();
    x.updated_at = dateFormat.setCurrentTimestamp();
  });
  next();
});

cartSchema.pre("update", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

cartSchema.pre("updateOne", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

cartSchema.pre("updateMany", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

cartSchema.pre("findOneAndUpdate", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
