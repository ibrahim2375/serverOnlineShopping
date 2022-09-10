const express = require('express');
const router = express.Router();
const session = require('express-session');
// const AuthenticateAdmin = require('../../../../../middlewares/authenticateAdmin')
router.get('/', (req, res, next) => {
    if (req.session.admin) {
        res.status(200).send(req.session.admin);
    } else {
        res.status(200).send('no admin');
    }
});
module.exports = router;