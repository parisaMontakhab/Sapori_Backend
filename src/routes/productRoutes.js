const express = require("express");

const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
//const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(getAllProducts).post(createNewProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
