const Product = require('../../../../models/Product');
const express = require('express');
const router = express.Router();
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.get('/:id', authenticateAdmin, async (req, res, next) => {
    await Product.findById(req.params.id).then((result) => {
        res.render('Admin/updateProduct/updateProduct.ejs', { admin: req?.session?.admin, product: result });
    }).catch((err) => {
        console.log(err.message);
        res.render('Admin/updateProduct/updateProduct.ejs', { admin: req?.session?.admin, product: [] });
    })
})
router.post('/:id', authenticateAdmin, async (req, res, next) => {
    if (req.params.id) {
        await Product.findByIdAndUpdate(req.params.id, {
            $set: { ...req.body }
        }).then((result) => {
            if (!result) {
                res.redirect(`/product/update/${req.params.id}`)
            } else {
                setTimeout(() => res.redirect(`/product/update/${req.params.id}`), 1000);
            }
        }).catch((err) => {
            res.status(403).send(err.status, err.message);
        })
    } else {
        res.status(403).send("you cant update this product");
    }
});
module.exports = router;