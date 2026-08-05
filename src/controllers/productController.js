const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! please upload images!", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImage = upload.single("photo");

exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`src/public/img/products/${req.file.filename}`);

  req.body.imageUrl = req.file.filename;

  next();
});

//controllers

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let query;

  if (req.query.search) {
    query = Product.find({
      name: {
        $regex: req.query.search,
        $options: "i",
      },
    });
  } else if (req.query.category) {
    query = Product.find({
      category: req.query.category,
    });
  } else {
    query = Product.find();
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const products = await query.skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    results: products.length,
    page,
    limit,
    data: {
      products,
    },
  });
});

exports.getProductById = factory.getOne(Product, { path: "reviews" });

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.createNewProduct = factory.createOne(Product);
