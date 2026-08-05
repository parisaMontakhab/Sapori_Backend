const express = require("express");
const { getCheckoutSession } = require("../controllers/paymentController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.get("/checkout-session/:productId", protect, getCheckoutSession);

module.exports = router;
