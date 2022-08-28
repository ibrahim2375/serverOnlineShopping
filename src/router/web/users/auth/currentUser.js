const express = require('express');
const router = express.Router();
const auth_controller = require('../../../../controller/user/auth/auth_controller');
const authenticateUser = require('../../../../../middlewares/authenticateUser');
router.get('/', authenticateUser, auth_controller.getCurrentUser);
module.exports = router;