const express = require('express');
const router = express.Router();

const productController = require('../controller/product');

router.post('', productController.addProduct);

router.get('', productController.getAll);

router.get('/:id', productController.getById);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteById);

router.delete('', productController.deleteAll);

module.exports = router;
