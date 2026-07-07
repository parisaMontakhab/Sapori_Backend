const express = require("express");
const { protect } = require("../controllers/authController");
const { addToCart } = require("../controllers/cartController");
const router = express.Router();

router.use(protect);

router.route("/:productId").post(addToCart);

module.exports = router;
