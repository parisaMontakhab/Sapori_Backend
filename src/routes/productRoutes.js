const express = require("express");

const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { restrictTo, protect } = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");
//const { protect } = require("../controllers/authController");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router
  .route("/")
  .get(getAllProducts)
  .post(protect, restrictTo("admin"), createNewProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

//Post products/2222/reviews

module.exports = router;
