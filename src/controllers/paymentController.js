const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  // 1) Get order and product information
  const order = await Order.findById(orderId).populate({
    path: "products.product",
    select: "name description price imageUrl",
  });

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  // 2) Only the owner of the order can pay for it
  if (order.user.toString() !== req.user.id) {
    return next(new AppError("You are not allowed to pay for this order", 403));
  }

  // 3) Check that the order has products
  if (!order.products || order.products.length === 0) {
    return next(new AppError("This order has no products", 400));
  }

  // 4) Convert order products to Stripe line items
  const lineItems = order.products.map((item) => {
    if (!item.product) {
      throw new AppError(
        "One of the products in this order no longer exists",
        404,
      );
    }

    const imageUrl = item.product.imageUrl.startsWith("http")
      ? item.product.imageUrl
      : `http://localhost:5001/img/products/${item.product.imageUrl}`;

    return {
      price_data: {
        currency: "eur",

        product_data: {
          name: item.product.name,
          description: item.product.description,
          images: [imageUrl],
        },

        unit_amount: Math.round(item.product.price * 100),
      },

      quantity: item.quantity,
    };
  });

  // 5) Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url: `${process.env.FRONTEND_URL}/cart`,

    customer_email: req.user.email,

    // Reference to the complete order, not one product
    client_reference_id: order.id,

    metadata: {
      orderId: order.id.toString(),
      orderNumber: order.orderNumber,
      userId: req.user.id,
    },

    line_items: lineItems,
  });

  // 6) Send only necessary data to frontend
  res.status(200).json({
    status: "success",
    data: {
      sessionId: session.id,
      checkoutUrl: session.url,
    },
  });
});

exports.webhookCheckout = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log("WEBHOOK ERROR:", err.message);

    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      status: "confirmed",
    });

    console.log(`Order ${orderId} marked as paid`);
  }

  res.status(200).json({
    received: true,
  });
};
