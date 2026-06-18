const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [80, "Product name must be less than 80 characters"],
    },

    description: {
      type: String,
      required: [true, "Product must have a description"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },

    price: {
      type: Number,
      required: [true, "Product must have a price"],
      min: [0, "Price cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "Product must have a category"],
      enum: {
        values: ["Pizza", "Pasta", "Insalata", "Dolci", "Antipasti", "Drinks"],
        message: "Invalid product category",
      },
    },

    imageUrl: {
      type: String,
      required: [true, "Product must have an image"],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
