const express = require('express');
const router = express.Router();
const authenticateUser = require('../../../../../middlewares/authenticateUser');
const makeOrder_controller = require('../../../../controller/user/makeOrder_controller')
router.post('/', authenticateUser, makeOrder_controller.makeOrder);
module.exports = router;