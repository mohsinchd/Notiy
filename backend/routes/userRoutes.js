const express = require("express");
const {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/userControllers");

const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/verify/email/:email").get(verifyEmail);
router.route("/reset/password/:token").put(resetPassword);

module.exports = router;
