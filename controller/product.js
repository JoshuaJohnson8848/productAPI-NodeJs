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
