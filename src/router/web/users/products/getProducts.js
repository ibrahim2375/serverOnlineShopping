const express = require('express');
const router = express.Router();
const getProducts_controller = require('../../../../controller/user/products/getProducts_controller')
router.get('/', getProducts_controller.getProducts);
module.exports = router;