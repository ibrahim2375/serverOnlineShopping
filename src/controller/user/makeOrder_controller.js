const Order = require('../../../models/Order')
const createError = require('../../errors/errorHandle');
const methods = {
    async makeOrder(req, res, next) {
        try {
            const { orders, userId } = req.body;
            orders?.map(async (order) => {
                const newOrder = new Order({
                    productId: order._id,
                    size: order.size,
                    color: order.color,
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    img: order.img,
                    productId: order._id,
                    category: order.category,
                    userId: userId
                });
                await newOrder.save().then((result) => {
                    if (!result) {
                        res.status(200).send('not added succesfully....');
                    }
                    res.status(200).send('added succesfully....');
                }).catch((err) => {
                    res.status(403);
                });

            })

        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}

module.exports = { ...methods }