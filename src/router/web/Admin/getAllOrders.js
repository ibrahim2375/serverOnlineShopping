const Order = require('../../../../models/Order');
const express = require('express');
const router = express.Router();
const createError = require('../../../errors/errorHandle');
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.get('/', async (req, res, next) => {
    await Order.find().sort({ createdAt: -1 }).then((result) => {
        if (!result) {
            next(createError(403, err.message));
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        next(createError(403, err.message));
    })
});
module.exports = router;