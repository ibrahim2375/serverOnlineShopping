const Admin = require('../../../models/Admin');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const createError = require('../../errors/errorHandle');
const loginFormSchema = require("../../validation/validateLoginForm");
const loginErrors = { message: '' };
const methods = {
    ///login
    async login(req, res, next) {
        try {
            const formData = req.body;
            const { email, password } = req.body;
            loginFormSchema.validate(formData)
                .catch(err => {
                    res.status(200);
                    loginErrors.message = err.errors;
                    res.redirect('/login');
                }).then(async (valid) => {
                    if (valid) {
                        ///search in db
                        await Admin.findOne({ email: email }).then(admin => {
                            if (!admin) {
                                loginErrors.message = 'this email not founded!';
                                res.redirect('/login');
                            } else {
                                bcrypt.compare(password, admin.password).then(async (result) => {
                                    if (result) {
                                        ///succuss login
                                        const { password, ...other } = admin._doc;
                                        req.session.admin = other;
                                        loginErrors.message = '';
                                        res.redirect('/');
                                    } else {
                                        loginErrors.message = 'password incorrect!';
                                        res.redirect('/login');
                                    }
                                }).catch((err) => {
                                    loginErrors.message = err.message;
                                    res.redirect('/login');
                                })
                            }
                        }).catch(err => {
                            loginErrors.message = err.message;
                            res.redirect('/login');
                        })
                    }
                });
        } catch (error) {
            next(error);
        }
    },
    //show login page
    async getLogin(req, res, next) {
        try {
            res.render("Admin/Login/login.ejs", { errors: loginErrors, admin: req?.session?.admin });
        } catch (error) {
            next(createError(error.status, error.message));
        }
    },
    async logOut(req, res) {
        try {
            await res.clearCookie('user_id');
            res.redirect('/');
        } catch (error) {
            res.error(error.message, error.status);
            res.redirect('/');
        }

    },
    async createAdmin(req, res, next) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newAdmin = new Admin({ ...req.body, password: hash });
            await newAdmin.save().then((success) => {
                if (success)
                    res.status(200).send('Admin added succesfully....')
            }
            ).catch((err) => {
                next(createError(err.status, err.message));
            });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = { ...methods }