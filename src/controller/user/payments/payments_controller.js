const Purchase = require('../../../../models/purchase');
const Stripe = require('stripe')(process.env.S_K);
// const { v4 } = require('uuid');
const createError = require('../../../errors/errorHandle');
const methods = {
    async paymentMethod(req, res, next) {
        try {
            // const { totalPrice, token, orders } = req.body;
            await Stripe.charges.create(
                {
                    source: req.body.tokenId,
                    amount: req.body.totalPrice * 100,
                    currency: "usd",
                },
                (stripeErr, stripeRes) => {
                    if (stripeErr) {
                        res.status(500).json(stripeErr);
                    } else {
                        res.status(200).json(stripeRes);
                    }
                })

        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}
module.exports = { ...methods }