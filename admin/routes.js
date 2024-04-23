const { Router } = require('express');
const adminController = require('../admin/controller');
const router = Router();

router.post('/registerAdmin', adminController.registerAdmin);
router.post('/loginAdmin', adminController.loginAdmin);

module.exports = router;