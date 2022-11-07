const express = require('express');
const router = express.Router();

const productController = require('../controller/product');

router.post('/addProduct', productController.addProduct);

router.get('/getAll', productController.getAll);

router.get('/getById', productController.getById);

router.put('/update', productController.updateProduct);

router.delete('/deleteById', productController.deleteById);

router.delete('/deleteAll', productController);

module.exports = router;
