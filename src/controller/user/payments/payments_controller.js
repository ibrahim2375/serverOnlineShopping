const Purchase = require('../../../../models/purchase');
const Stripe = require('stripe')(process.env.S_K);
const uuid = require('uuid');
const createError = require('../../../errors/errorHandle');
const methods = {
    async paymentMethod(req, res, next) {
        try {
        //     const basketItems = req.body.basketItems;
        //    await basketItems.map(async (item) => {
        //         const newPurchases = new Purchase({ userId: req.user.id, productId: item?._id, quantity: item?.quantity, price: item?.price });
        //         await newPurchases.save().then((result) => {
        //             res.status(200).json(result);
        //         }).catch((err) => { console.log(err) })
        //     })

            const { totalPrice, token } = req.body;
            PaymentKey = uuid();
            Stripe.customers.create({
                email: token.email,
                source: token.id,
            }).then((customer) => {
                // have access to the customer object
                Stripe.charges.create({
                    amount: totalPrice * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `purchase of products`,
                    shipping: {
                        name: token.card.name,
                        address: {
                            country: token.card.address_country,
                        }
                    }

                }, { PaymentKey })

            }).then(async (result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(403).json(err);
            });

        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}
module.exports = { ...methods }