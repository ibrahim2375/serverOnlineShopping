const Order = require('../../../models/Order')
const createError = require('../../errors/errorHandle');
const methods = {
    async deleteOrder(req, res, next) {
        try {
            const id = req.body.id;
            await Order.findByIdAndDelete(id)
                .then((result) => {
                    if (!result) {
                        res.status(200).send('not deleted succesfully....');
                    }
                    res.status(200).send('order deleted succesfully....');
                }).catch((err) => {
                    next(createError(err.status, err.message));
                });
        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}
module.exports = { ...methods }