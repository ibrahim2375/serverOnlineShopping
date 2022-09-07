const User = require('../../../models/User')
const createError = require('../../errors/errorHandle');
const methods = {
    async getUsers(req, res, next) {
        try {
            await User.find().then(result => {
                if (result) {
                    res.render('Admin/usersData/usersData.ejs', { admin: req?.session?.admin, users: result });
                } else {
                    res.render('Admin/usersData/usersData.ejs', { admin: req?.session?.admin, users: [] });
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
                res.render('Admin/usersData/usersData.ejs', { admin: req?.session?.admin, users: result });
            }).catch((err) => {
                console.log(err.message);
                res.render('Admin/usersData/usersData.ejs', { admin: req?.session?.admin, users: [] });
            })
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = { ...methods }