const express = require("express");

const {
  getAllReviews,
  createReview,
  deleteReview,
  getReview,
  updateReview,
  setProductUserIds,
  checkPurchasedProduct,
} = require("../controllers/reviewController");

const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route("/")
  .get(getAllReviews)
  .post(
    restrictTo("user"),
    setProductUserIds,
    checkPurchasedProduct,
    createReview,
  );

router
  .route("/:id")
  .get(getReview)
  .patch(restrictTo("user"), updateReview)
  .delete(restrictTo("user"), deleteReview);

module.exports = router;
