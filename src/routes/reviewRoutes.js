const express = require("express");
const {
  getAllReviews,
  createReview,
  deleteReview,
  setProductUsersIds,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, setProductUsersIds, createReview);

router.route("/:id").delete(deleteReview);

module.exports = router;
