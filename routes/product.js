const express = require('express');
const router = express.Router();

const productController = require('../controller/product');

router.post('/addProduct', productController.addProduct);

router.get('/getAll', productController.getAll);

router.get('/getById', productController.getById);

module.exports = router;
