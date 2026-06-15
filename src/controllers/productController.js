const Product = require("../models/productModel");

//controllers

exports.getAllProducts = async (req, res) => {
  try {
    let products;

    //category
    if (req.query.search) {
      products = await Product.find({
        name: { $regex: req.query.search, $options: "i" },
      });
    } else if (req.query.category) {
      products = await Product.find({
        category: req.query.category,
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({
      success: true,
      results: products.length,
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
