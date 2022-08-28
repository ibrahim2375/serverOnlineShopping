const express = require('express');
const router = express.Router();
const auth_controller = require('../../../../controller/Admin/auth_controller');
router.post('/', auth_controller.createAdmin);
module.exports = router;