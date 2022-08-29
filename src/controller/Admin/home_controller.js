const createError = require('../../errors/errorHandle');
const session = require('express-session');
const methods = {
    async getHome(req, res, next) {
        try {
            const cards_data = [
                {
                    title: 'Manage Your Business',
                    description: 'we manageing your products and we push them to our online shopping site and we use the most advanced technologies to manage sites',
                    img: 'assets/svg/svg1.svg',
                },
                {
                    title: 'objective',
                    description: 'to manage products from all aspects to know all information about your product views or how many customers who bought it',
                    img: 'assets/svg/svg2.svg',
                },
                {
                    title: 'make money',
                    description: 'just get started with online shopping and let us manage your products in easy ways',
                    img: 'assets/svg/svg3.svg',
                }
            ]
            res.render("Admin/Home/home.ejs", { cards_data: cards_data, admin: req?.session?.admin });
        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}
module.exports = { ...methods }