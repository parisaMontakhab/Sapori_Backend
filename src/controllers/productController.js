const mongoose = require("mongoose");
const Product = require("../models/productModel");

//controllers

exports.getAllProducts = async (req, res) => {
  try {
    let query;

    if (req.query.search) {
      query = Product.find({
        name: { $regex: req.query.search, $options: "i" },
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
