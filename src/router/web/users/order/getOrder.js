const express = require('express');
const router = express.Router();
const getOrder_controller = require('../../../../controller/user/getOrder_controller');
const authenticateUser = require('../../../../../middlewares/authenticateUser');
router.get('/', authenticateUser, getOrder_controller.getOrder);
module.exports = router;



