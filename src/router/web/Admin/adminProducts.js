const Product = require('../../../../models/Product')
const express = require('express');
const router = express.Router();
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
const adminProducts_controller = require('../../../controller/Admin/adminProducts_controller');
router.get('/', authenticateAdmin, adminProducts_controller.getAdminProducts);
router.post('/', authenticateAdmin, async (req, res, next) => {
    const search = req.body.search;
    await Product.find({
        $or: [
            { name: { $regex: '.*' + search + '.*' } },
            { brand: { $regex: '.*' + search + '.*' } },
            { type: { $regex: '.*' + search + '.*' } }
        ], ownerId: req.session.admin._id
    }).then((result) => {
        if (result)
            res.status(200).send(result)
        else
            res.status(200).send('not founded')
    }).catch((err) => {
        res.status(403).send(err.message)
    })
});
module.exports = router;