const Order = require('../../../../models/Order');
const express = require('express');
const router = express.Router();
const createError = require('../../../errors/errorHandle');
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.get('/:id', async (req, res, next) => {
    await Order.findByIdAndUpdate(req.params.id, {
        $set: { accept: true }
    }).then((result) => {
        if (!result) {
            next(createError(403, err.message));
        } else {
            res.status(200).send('accepted');
        }
    }).catch((err) => {
        next(createError(403, err.message));
    })
});
module.exports = router;