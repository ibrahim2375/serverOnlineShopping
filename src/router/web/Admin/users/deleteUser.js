const User = require('../../../../../models/User');
const express = require('express');
const router = express.Router();
const createError = require('../../../../errors/errorHandle');
//middlewares 
const authenticateAdmin = require('../../../../../middlewares/authenticateAdmin');
router.get('/:id', authenticateAdmin, async (req, res, next) => {
    if (req.params.id) {
        await User.findByIdAndDelete(req.params.id).then((result) => {
            if (!result) {
                res.status(403).send('cant delete this user');
            } else {
                res.status(200).send('deleted successfully');
            }
        }).catch((err) => {
            res.status(403).send(err.message);
        })
    } else {
        next(createError(404, "you cant delete this user"));
    }
});
module.exports = router;