const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Name"],
    maxLength: [30, "Name cannot be longer then 30 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter Email"],
    validate: [validator.isEmail, "Please enter correct Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [8, "Password must be atleast 8 characters"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
});

// Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// send JWT token
userSchema.methods.sendJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
