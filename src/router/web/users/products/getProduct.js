const Product = require('../../../../../models/Product')
const express = require('express');
const router = express.Router();
router.get('/:id', async (req, res) => {
    //get my  Product
    await Product.findById(req.params.id).then((result) => {
        if (!result) {
            res.status(200).send('there is no order');
        }
        res.status(200).send(result);
    }).catch((err) => {
        res.status(200).send(err.message);
    });
});
module.exports = router;