const Order = require('../../../models/Order')
const createError = require('../../errors/errorHandle');
const methods = {
    async getOrder(req, res, next) {
        try {
            //get my  orders
            await Order.find({ userId: req.user.id }).then((result) => {
                if (!result) {
                    res.status(403).send('there is no orders');
                }
                res.status(200).send(result);
            }).catch((err) => {
                next(createError(err.status, err.message));
            });

        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}

module.exports = { ...methods }