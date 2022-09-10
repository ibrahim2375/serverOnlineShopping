const express = require('express');
const router = express.Router();
const addSales_controller = require('../../../controller/user/addSales')
router.post('/', addSales_controller.addSales);
module.exports = router;