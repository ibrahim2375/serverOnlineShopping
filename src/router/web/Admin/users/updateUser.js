const User = require('../../../../../models/User');
const express = require('express');
const router = express.Router();
const createError = require('../../../../errors/errorHandle');
//middlewares
const authenticateAdmin = require('../../../../../middlewares/authenticateAdmin');
router.get('/:id', authenticateAdmin, async (req, res, next) => {
    await User.findById(req.params.id).then((result) => {
        // res.render('Admin/updateUser/updateUser.ejs', { admin: req?.session?.admin, user: result });
    }).catch((err) => {
        console.log(err.message);
        // res.render('Admin/updateProduct/updateProduct.ejs', { admin: req?.session?.admin, user: [] });
    })
})
router.post('/:id', authenticateAdmin, async (req, res, next) => {
    const { ban } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        ...req.body
    }).then((result) => {
        if (!result) {
            res.status(200).send("somthing wrong");
            // next(createError(403, "somthing wrong"));

        } else {
            res.status(200).send('updated');
            // res.redirect(`/user/update/${req.params.id}`)
        }
    }).catch((err) => {
        next(createError(err.status, err.message));
    })

});

module.exports = router;