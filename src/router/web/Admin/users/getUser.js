const Users = require('../../../../../models/User')
const createError = require('../../../../errors/errorHandle')
const express = require('express');
const router = express.Router();
//middlewares 
const authenticateAdmin = require('../../../../../middlewares/authenticateAdmin');
router.post('/:id', authenticateAdmin, async (req, res, next) => {
    await Users.findById(req.params.id)
        .then(user => {
            if (user) {
                const { password, ...others } = user._doc;
                res.status(200).send(others);
            } else {
                next(createError(403, 'this user not founded'))
            }
        }).catch(err => {
            next(createError(403, err.message))
        })
});
module.exports = router;