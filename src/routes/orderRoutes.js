const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createOrder,
  deleteOrder,
  getOrder,
} = require("../controllers/orderController");
const { getMyOrders } = require("../controllers/orderController");
const { getMyOrder } = require("../controllers/orderController");

const router = express.Router();

router.use(protect);

router.route("/").post(createOrder).get(getMyOrders);

router.route("/:id").get(getMyOrder).delete(deleteOrder);

module.exports = router;
