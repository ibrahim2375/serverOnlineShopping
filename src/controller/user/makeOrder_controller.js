const Order = require('../../../models/Order')
const createError = require('../../errors/errorHandle');
const methods = {
    async makeOrder(req, res, next) {
        try {
            const newOrder = new Order({ ...req.body, userId: req.user.id });
            await newOrder.save().then((result) => {
                if (!result) {
                    res.status(200).send('not added succesfully....');
                }
                res.status(200).json(result);
            }).catch((err) => {
                next(createError(err.status, err.message));
            });

        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}

module.exports = { ...methods }