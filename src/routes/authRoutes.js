const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} = require("../controllers/authController");
const {
  signupLimiter,
  loginLimiter,
  forgotPasswordLimiter,
} = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/signup", signupLimiter, signup);

router.post("/login", loginLimiter, login);

router.post("/forgotPassword", forgotPasswordLimiter, forgotPassword);

router.patch("/resetPassword/:token", resetPassword);

router.patch("/updateMyPassword", protect, updatePassword);
