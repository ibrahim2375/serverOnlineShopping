const Sales = require('../../../models/Sales')
const createError = require('../../errors/errorHandle');
const methods = {
    async addSales(req, res, next) {
        try {
            const { selectedOrders } = req.body;
            selectedOrders?.map(async (order) => {
                const newSale = new Sales({
                    productName: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    productId: order._id,
                    category: order.category,
                });
                await newSale.save().then((result) => {
                    if (!result) {
                        res.status(200).send('not added succesfully....');
                    }
                    res.status(200).send('added succesfully....');
                }).catch((err) => {
                    res.status(403).send(err);
                });
            })

        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}

module.exports = { ...methods }