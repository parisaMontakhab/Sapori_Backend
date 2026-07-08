const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
  // 1. get products from req.body
  const { products } = req.body;

  if (!products || products.length === 0) {
    return next(new AppError("Order must have at least one product", 400));
  }
  // 2) Validate products & calculate total price
  let totalPrice = 0;

  for (const item of products) {
    const product = await Product.findById(item.product);

    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }

    totalPrice += product.price * item.quantity;
  }

  // 4. create order with req.user._id
  const order = await Order.create({
    user: req.user._id,
    products,
    totalPrice,
  });

  // 5. send response
  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate({
    path: "products.product",
    select: "name image price category",
  });

  res.status(200).json({
    status: "success",
    result: orders.length,
    data: {
      orders,
    },
  });
});

exports.getMyOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.orderId,
    user: req.user._id,
  }).populate({
    path: "products.product",
    select: "name image price category",
  });

  if (!order) {
    return next(new AppError("There is no order with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});
