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
                    next(createError(err.status, err.message));
                });
            }

        } catch (error) {
            next(createError(error.status, error.message));
        }
    },
    async getSampleOfProductsOfFeature(req, res, next) {
        try {
            //get my  Product
            await Product.find({ type: 'feature' }).sort({ views: -1 }).limit(10).then((result) => {
                if (!result) {
                    res.status(200).send('there is no orders');
                }
                res.status(200).send(result);
            }).catch((err) => {
                next(createError(err.status, err.message));
            });
        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
    ,
    async getSampleOfProductsOfPopular(req, res, next) {
        try {
            //get my  Product
            await Product.find({ type: 'popular' }).sort({ views: -1 }).limit(10).then((result) => {
                if (!result) {
                    res.status(200).send('there is no orders');
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