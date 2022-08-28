const express = require('express');
const router = express.Router();
const auth_controller = require('../../../../controller/user/auth/auth_controller');
router.get('/', auth_controller.logOut);
module.exports = router;