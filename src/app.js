const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const { apiLimiter } = require("./middleware/rateLimiter");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const paymentRouter = require("./routes/paymentRoutes");

const paymentController = require("./controllers/paymentController");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.set("query parser", "extended");

// Global Middleware

// Set security http headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set limiter from api
app.use("/api", apiLimiter);

// CORS
app.use(cors());

// ------------------------------
// STRIPE WEBHOOK
// MUST be before express.json()
// ------------------------------
app.post(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentController.webhookCheckout,
);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/payments", paymentRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sapori API is running",
  });
});

app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
