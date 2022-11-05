const Product = require('../models/product');

exports.addProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  try {
    const product = new Product({
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price,
    });
    const createdProduct = await product.save();
    if (!createdProduct) {
      const error = new Error('Product Not Created');
      error.status = 422;
      throw error;
    }
    res.status(201).json({
      message: 'Product Created Succesfully',
      product: createdProduct,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      const error = new Error('Products Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({
      message: 'All Products Fetched Successfully',
      product: products,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  const productId = req.query.Id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Selected Product Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Product Fetched Successfully', product });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.query.productId;
  const title = req.body.title;
  const imageUrl = req.bod.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      const error = new Error('Product Not Found');
      error.status = 422;
      throw error;
    }
    existingProduct.title = title;
    existingProduct.imageUrl = imageUrl;
    existingProduct.description = description;
    existingProduct.price = price;
    const updatedProduct = await existingProduct.save();
    if (!updatedProduct) {
      const error = new Error('Product Not Updated');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({
        message: 'Product Updated Succesfully',
        product: updatedProduct,
      });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
