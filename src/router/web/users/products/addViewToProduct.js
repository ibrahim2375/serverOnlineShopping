const express = require('express');
const router = express.Router();
const addViewToProduct_controller = require('../../../../controller/user/products/addViewToProduct_controller')
router.put('/:id', addViewToProduct_controller.addView);
module.exports = router;