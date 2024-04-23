const { Router } = require('express');
const productController = require('../product/controller');
const { verifyJWTToken } = require("../utils/jwt");
const router = Router();

router.post('/addProduct', verifyJWTToken, productController.addProduct);
router.delete('/deleteProduct', verifyJWTToken, productController.deleteProduct);
router.get('/fetchProductList', verifyJWTToken, productController.fetchProductList);

module.exports = router;