const express = require('express');
const router = express.Router();
const createError = require('../../../../errors/errorHandle');
const authenticateUser = require('../../../../../middlewares/authenticateUser');
const deleteOrder_controller = require('../../../../controller/user/deleteOrder_controller')
router.post('/', authenticateUser, deleteOrder_controller.deleteOrder);
module.exports = router;