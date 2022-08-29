// const Product = require('../../../../models/Product');
// const express = require('express');
// const router = express.Router();
// const session = require('express-session');
// const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
// router.post('/', authenticateAdmin, async (req, res, next) => {
//     await Product.find({
//         $or: [
//             { name: { $regex: '.*' + req.body.search + '.*' } },
//             { brand: { $regex: '.*' + req.body.search + '.*' } },
//             { type: { $regex: '.*' + req.body.search + '.*' } }
//         ], ownerId: req.session.admin._id
//     }).then((result) => {
//         res.render('Admin/adminProducts/adminProducts.ejs', { admin: req?.session?.admin, products: result });
//     }).catch((err) => {
//         console.log(err.message);
//         res.render('Admin/adminProducts/adminProducts.ejs', { admin: req?.session?.admin, products: [] });
//     })
// });
// module.exports = router;