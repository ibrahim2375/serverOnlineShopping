const User = require('../../../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../../../errors/errorHandle');
const methods = {
    async createUser(req, res, next) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({ ...req.body, password: hash });
            await newUser.save().then((success) => {
                if (success)
                    res.status(200).json({ message: 'user saved successfully' });
            }).catch((error) => {
                next(createError(error.status, error.message));
            });

        } catch (error) {
            next(error);
        }
    },
    async signIn(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            await User.findOne({ email: email }).then(user => {
                if (!user) {
                    next(createError(403, 'this email not founded!'));
                } else {
                    bcrypt.compare(password, user.password).then(async (result) => {
                        if (result) {
                            ///succuss login
                            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY_USER);
                            const { password, ...other } = user._doc;
                            res.cookie("access_token_user", token).status(200).json(other);
                        } else {
                            next(createError(403, 'password incorrect!'));
                        }
                    }).catch((err) => {
                        next(createError(403, err.message));
                    })
                }
            }).catch(err => {
                next(createError(403, err.message));
            })

        } catch (error) {
            next(error);
        }
    }, 
    async logOut(req, res, next) {
        try {
            await res.clearCookie('access_token_user');
            res.status(200).json({ message: 'logout successfully' });

        } catch (error) {
            next(createError(403, err.message));
        }
    },
    async getCurrentUser(req, res, next) {
        try {
            await User.findById(req.user.id).then(user => {
                if (user) res.status(200).json(user);
                else next(createError(200, 'user not founded'));
            }).catch((err) => {
                next(createError(403, err.message));
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { ...methods }