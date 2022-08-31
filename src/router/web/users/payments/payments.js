const express = require('express');
const router = express.Router();
//middlewares 
const authenticateUser = require('../../../../../middlewares/authenticateUser');
const payments_controller = require('../../../../controller/user/payments/payments_controller');
router.post('/', authenticateUser, payments_controller.paymentMethod );
module.exports = router;