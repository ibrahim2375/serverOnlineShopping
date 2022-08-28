// const Product = require('../../../../models/products/Product');
// const express = require('express');
// const router = express.Router();
// const createError = require('../../../errors/errorHandle');
// //middlewares 
// const authenticateOwner = require('../../../../middlewares/authenticateOwner');
// router.delete('/:id', authenticateOwner ,async (req, res, next) => {
//     if (req.params.id) {
//         await Product.findByIdAndDelete(req.params.id).then((result) => {
//             if (!result) {
//                 next(createError(404, "somthing wrong"));
//             } else {
//                 res.status(200).send({ message: "product deleted successfully.." });
//             }
//         }).catch((err) => {
//             next(createError(err.status, err.message));
//         })
//     } else {
//         next(createError(404, "you cant delete this product"));
//     }
// });
// module.exports = router;