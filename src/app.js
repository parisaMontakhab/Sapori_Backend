const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
//const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const { apiLimiter } = require("./middleware/rateLimiter");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.set("query parser", "extended");

//Global Middleware

//Set security http headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Set limiter from api
app.use("/api", apiLimiter);

// CORS middleware
// Without this, browsers block requests from different origins
// (e.g. React app on localhost:5173 calling this API on localhost:3000).
app.use(cors());

//Body parser,reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//Data sanitization against NoSQL query injection
//app.use(mongoSanitize());

//Prevent parameter pollution
app.use(hpp());

//Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

app.get("/", (req, res) => {
  // Health check route
  // Used to quickly test if the API server is running.
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
