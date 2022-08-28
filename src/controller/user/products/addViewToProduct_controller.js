const Product = require('../../../../models/Product')
const createError = require('../../../errors/errorHandle');
var countOfPeople = 0;
const methods = {
    async addView(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            // calculate TotalReviewsstars
            const total = product.reviews;
            for (let index = 0; index < total.length; index++) {
                countOfPeople += total[index] / 5;
                console.log(total[index]);
            }
            var TotalReviewStars = countOfPeople * 5 / total.length;
            // console.log(TotalReviewStars);
            // calculate TotalReviewsstars
            await product.updateOne({
                $inc: { views: 1 }, $push: { reviews: req.body.starsNumber },
                $set: { TotalReviewStars: Math.floor(TotalReviewStars) }
            }).then(async (result) => {
                if (!result) {
                    res.status(200).send('cant add view to this product');
                }
                res.status(200).send('successfully viewed');
            }).catch((err) => {
                next(createError(err.status, err.message));
            });


        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}
module.exports = { ...methods }