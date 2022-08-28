const Products = require('../../../models/Product')
const createError = require('../../errors/errorHandle');
const session = require('express-session');
const methods = {
    async getAdminProducts(req, res, next) {
        try {
            await Products.find({ ownerId: req.session.admin._id }).then((result) => {
                if (result)
                    res.render('Admin/adminProducts/adminProducts.ejs', { admin: req?.session?.admin, products: result });
                else
                    res.render('Admin/adminProducts/adminProducts.ejs', { admin: req?.session?.admin, products: [] });
            })

        } catch (error) {
            next(createError(error.status, error.message));
        }
    }

}

module.exports = { ...methods }