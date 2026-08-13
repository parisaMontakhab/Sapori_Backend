const express = require("express");

const {
  getAllReviews,
  createReview,
  deleteReview,
  getReview,
  updateReview,
  setProductUserIds,
  checkPurchasedProduct,
  checkReviewOwner,
} = require("../controllers/reviewController");

const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

// Public
router.route("/").get(getAllReviews);

router.route("/:id").get(getReview);

// Protected from here
router.use(protect);

router
  .route("/")
  .post(
    restrictTo("user"),
    setProductUserIds,
    checkPurchasedProduct,
    createReview,
  );

router
  .route("/:id")
  .patch(restrictTo("user"), checkReviewOwner, updateReview)
  .delete(restrictTo("user"), checkReviewOwner, deleteReview);

module.exports = router;
