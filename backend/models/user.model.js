const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dateFormat = require("../helper/dateformate.helper");
const constants = require("../config/constants");
const { JWT_AUTH_SECRET } = require("../keys/keys");

let userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  // reporting_person: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
  password: {
    type: String,
    minlength: 6,
  },
  shipping_address: {
    type: String,
  },
  billing_address: {
    type: String,
  },
  contact: {
    type: String,
  },
  auth_token: {
    type: String,
  },
  reset_token: {
    type: String,
  },
  created_at: {
    type: Number,
  },
  updated_at: {
    type: Number,
  },
  deleted_at: {
    type: Number,
    default: null,
  },
  soft_delete: {
    type: Boolean,
    default: false,
  },
});

//Checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//Output data to JSON
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  delete userObject.reset_token;
  delete userObject.auth_token;
  delete userObject.soft_delete;
  delete userObject.deleted_at;
  return userObject;
};

//Checking for user credentials
userSchema.statics.findByCredentials = async function (
  email,
  password
  // user_type
) {
  const user = await User.findOne({
    email: email,
    // user_type: { $in: user_type },
    deleted_at: null,
  });

  if (!user) {
    return 1;
  }
  if (!user.validPassword(password)) {
    return 2;
  }
  return user;
};

//Generating auth token
userSchema.methods.generateAuthToken = async function () {
  let user = this;
  let token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.company_email,
    },
    JWT_AUTH_SECRET,
    {
      expiresIn: constants.AUTH_TOKEN_EXPIRE_TIME,
    }
  );
  user.auth_token = token;
  user.updated_at = dateFormat.setCurrentTimestamp();
  // user.tokens_expire_at = dateFormat.addTimeToCurrentTimestamp(1, 'days')
  await user.save();
  return token;
};

userSchema.pre("save", function (next) {
  if (!this.created_at && !this.joining_date) {
    this.created_at = dateFormat.setCurrentTimestamp();
    this.joining_date = dateFormat.setCurrentTimestamp();
  }
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

userSchema.pre("insertMany", function (next, docs) {
  docs.map(function (x) {
    if (!x.created_at) x.created_at = dateFormat.setCurrentTimestamp();
    x.updated_at = dateFormat.setCurrentTimestamp();
  });
  next();
});

userSchema.pre("update", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

userSchema.pre("updateOne", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

userSchema.pre("updateMany", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  this.updated_at = dateFormat.setCurrentTimestamp();
  next();
});

// Define user model
const User = mongoose.model("users", userSchema);
module.exports = User;
