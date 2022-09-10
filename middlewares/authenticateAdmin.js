const createError = require('../src/errors/errorHandle')
const session = require('express-session');
const authenticateAdmin = (req, res, next) => {
    try {
        if (req.session.admin) {
            next();
        } else {
            next(createError(404, 'authenticatation faild'));
        }
    } catch (err) {
        next(createError(404, err.message));
    }
}
module.exports = authenticateAdmin;