const Product = require('../../../../models/Product');
const express = require('express');
const router = express.Router();
const createError = require('../../../errors/errorHandle');
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.get('/:id', authenticateAdmin, async (req, res, next) => {
    await Product.findById(req.params.id).then((result) => {
    }).catch((err) => {
        console.log(err.message);
    })
})
router.post('/:id', authenticateAdmin, async (req, res, next) => {
        await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                ...req.body
            }
        }).then((result) => {
            if (!result) {
                res.status(200).send("somthing wrong");
            } else {
                res.status(200).send('updated');
            }
        }).catch((err) => {
            next(createError(err.status, err.message));
        })
    }
);
module.exports = router;