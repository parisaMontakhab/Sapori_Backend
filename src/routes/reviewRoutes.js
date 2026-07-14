const express = require("express");
const {
  getAllReviews,
  createReview,
  deleteReview,
  setProductUsersIds,
  getReview,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, setProductUsersIds, createReview);

router.route("/:id").delete(deleteReview).get(getReview);

module.exports = router;
