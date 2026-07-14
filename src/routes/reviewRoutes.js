const express = require("express");
const {
  getAllReviews,
  createReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllReviews).post(protect, createReview);

router.route("/:id").delete(deleteReview);

module.exports = router;
