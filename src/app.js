const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { apiLimiter } = require("./middlewares/rateLimiter");

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.set("query parser", "extended");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", apiLimiter);

// CORS middleware
// Without this, browsers block requests from different origins
// (e.g. React app on localhost:5173 calling this API on localhost:3000).
app.use(cors());

app.use(express.json());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

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
