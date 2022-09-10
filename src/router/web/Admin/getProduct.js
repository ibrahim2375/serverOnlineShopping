const Product = require('../../../../models/Product');
const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
router.get('/', authenticateAdmin, async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})
router.post('/:id', authenticateAdmin, async (req, res, next) => {
    await Product.findById(req.params.id).then((result) => {
        if (result) {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(err.status).send(err.message)
    })
});
module.exports = router;
