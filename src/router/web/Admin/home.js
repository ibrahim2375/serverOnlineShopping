const express = require('express');
const router = express.Router();
const home_controller = require('../../../controller/Admin/home_controller');
router.get('/', home_controller.getHome);
module.exports = router;