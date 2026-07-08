const express = require("express");
const { protect } = require("../controllers/authController");
const { createOrder } = require("../controllers/orderController");
const { getMyOrders } = require("../controllers/orderController");
const { getMyOrder } = require("../controllers/orderController");

const router = express.Router();

router.use(protect);

router.route("/").post(createOrder).get(getMyOrders);

router.route("/:orderId").get(getMyOrder);

module.exports = router;
