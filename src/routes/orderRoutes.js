const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  createOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  updateOrder,
  getMyOrder,
  getMyOrders,
} = require("../controllers/orderController");

const router = express.Router();
router.use(protect);

router.route("/my-orders").get(getMyOrders).post(createOrder);
router.get("/my-orders/:id", getMyOrder);

router.use(restrictTo("admin"));

router.route("/").get(getAllOrder);

router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
