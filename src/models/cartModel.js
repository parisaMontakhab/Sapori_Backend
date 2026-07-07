const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
      unique: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Cart item must have a product"],
        },

        quantity: {
          type: Number,
          required: [true, "Cart item must have a quantity"],
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
