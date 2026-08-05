const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    success_url: "http://localhost:5001/payment-success",
    cancel_url: "http://localhost:5001/payment-cancel",

    customer_email: req.user.email,
    client_reference_id: productId,

    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.description,
            images: [`http://localhost:5001/img/products/${product.imageUrl}`],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    session,
  });
});
