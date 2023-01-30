const { asyncHandler } = require("../middleware/asyncHandler");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/sendToken");
const crypto = require("crypto");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const mailVerificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/verify/email/${req.body.email}`;

  const message = `Your Email Verfication URL is\n\n${mailVerificationUrl}\n\nIf you did'nt Requested this Email then Please ignore it.`;

  // Send Email
  try {
    sendMail({
      subject: "Email Verification",
      email: req.body.email,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }

  sendToken(user, 201, res);
});

// Verify Email
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  (user.isVerified = true), await user.save();

  res.status(200).send("Email Is Verified");
});

// Login User
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Find If User Exists
  const user = await User.findOne({ email });
  if (!user)
    return next(new ErrorHandler("Email or Password is Incorrect", 400));

  // Compare password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Email or Password is Incorrect", 400));

  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

// Forgot Password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new ErrorHandler("Email is Incorrect or User does not exist", 400)
    );

  const resetPasswordToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/api/v1/user/reset/password/${resetPasswordToken}`;

  const message = `Your Email Verfication URL is\n\n${resetPasswordUrl}\n\nIf you did'nt Requested this Email then Please ignore it.`;

  try {
    sendMail({
      subject: "Reset Password Url",
      email: req.body.email,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Email Sent successfully",
    });
  } catch (error) {
    user.passwordResetExpire = undefined;
    user.passwordResetToken = undefined;
    return next(new ErrorHandler(error.message, 400));
  }
});

// update Password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: resetPasswordToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Reset Password Token is Invalid or has been expired",
        400
      )
    );

  user.password = req.body.password;
  user.passwordResetExpire = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  sendToken(user, 200, res);
});
