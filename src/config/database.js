const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

const connectDB = async () => {
  try {
    await mongoose.connect(DB);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
