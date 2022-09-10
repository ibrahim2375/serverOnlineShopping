const Sales = require('../../../models/Sales')
const createError = require('../../errors/errorHandle');
const methods = {
    async addSales(req, res, next) {
        try {
            const { orders, payMethod } = req.body;
            orders?.map(async (order) => {
                const newSale = new Sales({
                    ProductName: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    productId: order._id,
                    productCategory: order.category,
                    payMethod: payMethod
                });
                await newSale.save().then((result) => {
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