const express = require('express');
const router = express.Router();

const productController = require('../controller/product');

router.post('/addProduct', productController.addProduct);

router.post('/getAll', productController);

module.exports = router;
