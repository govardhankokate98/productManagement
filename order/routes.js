const { Router } = require('express');
const orderController = require('../order/controller');
const router = Router();
const { verifyJWTToken } = require("../utils/jwt");

router.post('/createOrder', verifyJWTToken, orderController.createOrder);
router.get('/fetchUserOrder', verifyJWTToken, orderController.fetchUserOrder);
router.get('/fetchAllOrder', verifyJWTToken, orderController.fetchAllOrder);

module.exports = router;