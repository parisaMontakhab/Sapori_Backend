const rateLimit = require("express-rate-limit");

// General API limiter
exports.apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.API_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many requests. Please try again later.",
  },
});

// Login limiter
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: process.env.LOGIN_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

// Signup limiter
exports.signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.SIGNUP_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many signup attempts. Please try again later.",
  },
});

// Forgot password limiter
exports.forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: process.env.FORGOT_PASSWORD_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many password reset requests. Please try again later.",
  },
});
