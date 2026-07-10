const express = require("express");
const {
  getAllReviews,
  createReview,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllReviews).post(protect, createReview);

module.exports = router;
