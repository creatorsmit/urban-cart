const mongoose = require("mongoose");
const dateFormat = require("../helper/dateformate.helper");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  description: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String
    // enum: {
    //   values: [
    //     "Electronics",
    //     "Cameras",
    //     "Laptops",
    //     "Accessories",
    //     "Headphones",
    //     "Food",
    //     "Books",
    //     "Clothes/Shoes",
    //     "Beauty/Health",
    //     "Sports",
    //     "Outdoor",
    //     "Home",
    //   ],
    //   message: "Please select correct category for product",
    // },
  },
  seller: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  //   user: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User",
  //     required: false,
  //   },
  created_at: {
    type: Number,
  },
  updated_at: {
    type: Number,
  },
});

productSchema.pre("save", function (next) {
  if (!this.created_at && !this.joining_date) {
    this.created_at = dateFormat.setCurrentTimestamp();
  }
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

productSchema.pre("insertMany", function (next, docs) {
  docs.map(function (x) {
    if (!x.created_at) x.created_at = dateFormat.setCurrentTimestamp();
    x.updated_at = dateFormat.setCurrentTimestamp();
  });
  next();
});

productSchema.pre("update", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

productSchema.pre("updateOne", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

productSchema.pre("updateMany", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
