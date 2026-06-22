const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user must have a name"],
      trim: true,
      minlength: [2, "user name must be at least 2 characters"],
      maxlength: [80, "user name must be less than 80 characters"],
    },

    password: {
      type: String,
      required: [true, "user must have a password"],
      minlength: [8, "password must be at least 8 characters"],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
    },

    role: {
      type: String,
      // required: [true, "user must have a role"],
      enum: {
        values: ["admin", "user"],
        message: "Invalid user role",
      },
    },

    email: {
      type: String,
      required: [true, "user must have an email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    photo: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
