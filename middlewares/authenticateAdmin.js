const createError = require('../src/errors/errorHandle')
const session = require('express-session');
const authenticateAdmin = (req, res, next) => {
    try {
        if (req.session.admin) {
            next();
        } else {
            res.redirect('/');
        }
    } catch (err) {
        next(createError(err.status, err.message));
    }
}
module.exports = authenticateAdmin;