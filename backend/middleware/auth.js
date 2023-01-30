const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("./asyncHandler");

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(
      new ErrorHandler("Please Login First to Access this Resource", 401)
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id).select("-password");
  next();
});

exports.isVerified = (req, res, next) => {
  if (req.user.isVerified) {
    return next();
  }

  return next(
    new ErrorHandler(
      "Please verify your Email first to access this resource",
      401
    )
  );
};
