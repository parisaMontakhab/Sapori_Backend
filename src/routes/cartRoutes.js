const express = require("express");
const { addToCart } = require("../controllers/cartController");
const router = express.Router();

router.route("/:productId").post(addToCart);

module.exports = router;
