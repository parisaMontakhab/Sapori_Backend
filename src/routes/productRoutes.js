const express = require("express");

const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

module.exports = router;
