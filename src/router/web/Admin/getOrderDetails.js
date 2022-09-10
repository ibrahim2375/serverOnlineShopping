const Order = require('../../../../models/Order');
const User = require('../../../../models/User');
const Product = require('../../../../models/Product');
const express = require('express');
const router = express.Router();
const createError = require('../../../errors/errorHandle');

router.get('/:id', async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    const userData = await User.findById(order.userId);
    const { password, ...user } = userData._doc;
    if (order && userData) {
        res.status(200).send({ user, order })
    } else {
        res.status(403).json("something wrong")
    }

    // .then((result) => res.status(200).send(result)).catch((err) => res.status(403).send(err));
});
module.exports = router;
