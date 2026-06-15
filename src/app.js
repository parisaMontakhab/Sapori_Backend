const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRouter = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sapori API is running",
  });
});

module.exports = app;
