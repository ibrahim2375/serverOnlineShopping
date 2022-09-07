const express = require('express');
const router = express.Router();
//middlewares 
const authenticateAdmin = require('../../../../../middlewares/authenticateAdmin');
const getUser_controller = require('../../../../controller/Admin/users_controller');
router.get('/', authenticateAdmin, getUser_controller.getUsers);
router.post('/', authenticateAdmin, getUser_controller.getUser);
module.exports = router;