const User = require('../../../models/User')
const createError = require('../../errors/errorHandle');
const methods = {
    async getUsers(req, res, next) {
        try {
            await User.find().then(result => {
                if (result) {
                    res.status(200).send(result);

                } else {
                    next(createError(403, err.message));
                }
            }).catch((err) => {
                next(createError(403, err.message));
            })
        } catch (error) {
            next(error);
        }
    },
    async getUser(req, res, next) {
        try {
            await User.find({
                $or: [
                    { name: { $regex: '.*' + req.body.search + '.*' } },
                    { email: { $regex: '.*' + req.body.search + '.*' } },
                ]
            }).then((result) => {

            }).catch((err) => {
                console.log(err.message);
            })
        } catch (error) {
            next(error);
        }
    }

}

module.exports = { ...methods }