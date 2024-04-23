const { Router } = require('express');
const userController = require('../user/controller');
const router = Router();

router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);

module.exports = router;