require("dotenv").config();

const connectDB = require("../config/database");
const Product = require("../models/productModel");

const products = require("./products.json");

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Data Imported Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importData();
