const Order = require('../../../../models/Order');
const express = require('express');
const router = express.Router();
const createError = require('../../../errors/errorHandle');
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.post('/', authenticateAdmin, async (req, res, next) => {
    const { selectedOrders } = req.body
    selectedOrders?.map(async (order) => {
        await Order.findByIdAndUpdate(order?._id, {
            add_to_sales: true
        }).then((result) => {
            if (!result) {
                res.status(200).send("somthing wrong");
            } else {
                res.status(200).send('updated');
            }
        }).catch((err) => {
            next(createError(err.status, err.message));
        })
    })
}
);
module.exports = router;