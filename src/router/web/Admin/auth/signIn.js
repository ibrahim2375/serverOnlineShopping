const express = require('express');
const router = express.Router();
const auth_controller = require('../../../../controller/Admin/auth_controller');
router.get('/', auth_controller.getLogin);
router.post('/', auth_controller.login);
module.exports = router;