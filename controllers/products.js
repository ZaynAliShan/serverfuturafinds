const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res
    .status(StatusCodes.OK)
    .json({ total: products.length, products, user: req.user });
};
const getSingleProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findOne({ _id: productID });

  if (!product) {
    throw new NotFoundError(`No product with the ID: ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  const { sku, name, onHold, sold, toCome } = req.body;
  if (!sku || !name) {
    throw new BadRequestError("Please provide product sku & product title");
  }

  // Checking the Sku already exists or not
  const isSkuExists = await Product.findOne({ sku });
  if (isSkuExists) {
    throw new BadRequestError(`Product already exists with this SKU: ${sku}`);
  }

  const product = await Product.create({ sku, name, onHold, sold, toCome });
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { productID } = req.params;
  const { sku, name, onHold, sold, toCome } = req.body;
  if (!sku || !name) {
    throw new NotFoundError("Please provide product SKU & product name");
  }
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with ID: ${productID}`);
  }

  product.sku = sku;
  product.name = name;
  product.onHold = onHold;
  product.sold = sold;
  product.toCome = toCome;
  await product.save();
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with ID: ${productID}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
