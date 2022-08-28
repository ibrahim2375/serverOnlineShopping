const express = require('express');
const router = express.Router();
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
const adminProducts_controller = require('../../../controller/Admin/adminProducts_controller');
router.get('/', authenticateAdmin, adminProducts_controller.getAdminProducts );
module.exports = router;