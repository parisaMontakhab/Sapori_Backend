const mongoose = require("mongoose");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//controllers

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let query;

  if (req.query.search) {
    query = Product.find({
      name: {
        $regex: req.query.search,
        $options: "i",
      },
    });
  } else if (req.query.category) {
    query = Product.find({
      category: req.query.category,
    });
  } else {
    query = Product.find();
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const products = await query.skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    results: products.length,
    page,
    limit,
    data: {
      products,
    },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    data: {
      product,
    },
  });
});
