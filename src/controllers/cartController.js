const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync(async (req, res, next) => {
  // 1) Check if product exists
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  // 2) Find user's cart
  let cart = await Cart.findOne({ user: req.user._id });

  // 3) If cart doesn't exist, create one
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      products: [
        {
          product: product._id,
          quantity: 1,
        },
      ],
    });

    return res.status(201).json({
      status: "success",
      data: {
        cart,
      },
    });
  }

  // 4) Check if product already exists in cart
  const existingItem = cart.products.find((item) =>
    item.product.equals(product._id),
  );

  // 5) Update quantity or add new product
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.products.push({
      product: product._id,
      quantity: 1,
    });
  }

  // 6) Save cart
  await cart.save();

  // 7) Send response
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
