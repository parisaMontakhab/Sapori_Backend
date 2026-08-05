const express = require("express");

const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resizeProductImage,
} = require("../controllers/productController");
const { restrictTo, protect } = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router
  .route("/")
  .get(getAllProducts)
  .post(protect, restrictTo("admin"), createNewProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(
    protect,
    restrictTo("admin"),
    uploadProductImage,
    resizeProductImage,
    updateProduct,
  )
  .delete(protect, restrictTo("admin"), deleteProduct);

module.exports = router;
