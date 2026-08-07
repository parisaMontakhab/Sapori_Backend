const Review = require("../models/reviewModel");
const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.setProductUserIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.checkPurchasedProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.productId || req.body.product;

  if (!productId) {
    return next(new AppError("Product ID is required", 400));
  }

  const order = await Order.findOne({
    user: req.user.id,
    paymentStatus: "paid",
    "products.product": productId,
  });

  if (!order) {
    return next(
      new AppError("You can only review products you have purchased.", 403),
    );
  }

  next();
});

exports.createReview = factory.createOne(Review);

exports.getAllReviews = factory.getAll(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.getReview = factory.getOne(Review);

exports.updateReview = factory.updateOne(Review);
