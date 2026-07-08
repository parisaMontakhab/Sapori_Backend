const mongoose = require("mongoose");
const crypto = require("crypto");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },

    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Order item must have a product"],
        },

        quantity: {
          type: Number,
          required: [true, "Order item must have a quantity"],
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: [true, "Order must have a total price"],
      min: [0, "Total price cannot be negative"],
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
      default: "pending",
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// Document Middleware

orderSchema.pre("validate", function () {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${crypto.randomInt(10000000, 100000000)}`;
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
