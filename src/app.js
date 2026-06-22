const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

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
