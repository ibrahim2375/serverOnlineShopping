const Order = require('../../../models/Order')
// const createError = require('../../errors/errorHandle');
const methods = {
    async getOrder(req, res, next) {
        try {
            //get my  orders
            await Order.find({ userId: req.body.userId }).then((result) => {
                if (!result) {
                    res.status(403).send('there is no orders');
                }
                res.status(200).send(result);
            }).catch((err) => {
                res.status(403).send(err.message)
            });

        } catch (error) {
            res.status(403).send(error.message)
        }
    }
}

module.exports = { ...methods }