const Product = require('../../../../models/Product')
const createError = require('../../../errors/errorHandle');
const methods = {
    async getProducts(req, res, next) {
        try {
            const query = req.query.category;
            if (!query) {
                await Product.aggregate([{ $sample: { size: 300 } }]).then((result) => {
                    if (!result) {
                        res.status(200).send('there is no products');
                    }
                    res.status(200).send(result);
                }).catch((err) => {
                    next(createError(err.status, err.message));
                });
            } else {
                await Product.find({ category: query }).then((result) => {
                    if (!result) {
                        res.status(200).send('there is no products');
                    }
                    res.status(200).send(result);
                }).catch((err) => {
                    res.status(403).send(err);
                });
            }

        } catch (error) {
            nres.status(404).send(error.message);
        }
    },
    async getSampleOfProductsOfFeature(req, res, next) {
        try {
            //get my  Product
            await Product.find({ type: 'feature' }).limit(10).then((result) => {
                if (!result) {
                    res.status(200).send('there is no orders');
                }
                res.status(200).send(result);
            }).catch((err) => {
                res.status(403).send(err);

            });
        } catch (error) {
            res.status(403).send(error);
        }
    }
    ,
    async getSampleOfProductsOfPopular(req, res, next) {
        try {
            //get my  Product
            await Product.find({ type: 'popular' }).limit(10).then((result) => {
                if (!result) {
                    res.status(200).send('there is no orders');
                }
                res.status(200).send(result);
            }).catch((err) => {
                res.status(403).send(err);

            });
        } catch (error) {
            res.status(404).send(error);
        }
    }
}
module.exports = { ...methods }