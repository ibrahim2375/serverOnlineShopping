const Purchase = require('../../../../models/purchase');
const Stripe = require('stripe')(process.env.S_K);
const { v4: uuidv4 } = require('uuid');
const createError = require('../../../errors/errorHandle');
const methods = {
    async paymentMethod(req, res, next) {
        try {
            const { totalPrice, token, basketItems } = req.body;
            PaymentKey = uuidv4();
            Stripe.customers
                .create({
                    email: token.email,
                    source: token.id,
                })
                .then((customer) => {
                    // have access to the customer object
                    return Stripe.invoiceItems
                        .create({
                            customer: customer.id, // set the customer id
                            amount: totalPrice * 100,// 25
                            currency: 'usd',
                            description: `products ${basketItems}`,
                            shipping: {
                                name: token.card.name,
                                address: {
                                    country: token.card.address_country,
                                }
                            }
                        }).then((invoiceItem) => {
                            return Stripe.invoices.create({
                                collection_method: 'send_invoice',
                                customer: invoiceItem.customer,
                            });
                        })
                        .then((invoice) => {
                            res.status(200).json(invoice);
                        })
                        .catch((err) => {
                            res.status(403).json(err);
                        });
                });
            // Stripe.customers.create({
            //     email: token.email,
            //     source: token.id,
            // }).then((customer) => {
            //     // have access to the customer object
            //     Stripe.charges.create({
            //         amount: totalPrice * 100,
            //         currency: 'usd',
            //         customer: customer.id,
            //         receipt_email: token.email,
            //         description: `purchase of products`,
            //         shipping: {
            //             name: token.card.name,
            //             address: {
            //                 country: token.card.address_country,
            //             }
            //         }

            //     }, { PaymentKey })

            // }).then(async (result) => {
            //     res.status(200).json(result);

            // }).catch((err) => {
            //     res.status(403).json(err);
            // });

            // await basketItems.map((item) => {
            //     const newPurchases = new Purchase({ userId: item?.userId, productId: item?.productId, quantity: item?.quantity, price: item?.price });
            //     newPurchases.save().then((result) => {
            //         res.status(200).json(result);
            //     }).catch((err) => { console.log(err) })
            // })
        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}
module.exports = { ...methods }