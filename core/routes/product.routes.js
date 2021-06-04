const express = require('express');

const router = express.Router();
const productController = require('../controller/product.controller');

router.route('/').get(productController.listProducts);
router.route('/').post(productController.createProduct);
router.route('/:sku').get(productController.findProductBySku);
router.route('/:sku').put(productController.updateProduct);
router.route('/:sku').delete(productController.deleteProduct);

module.exports = router;
