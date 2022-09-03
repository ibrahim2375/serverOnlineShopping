const Product = require('../../../../models/Product');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const session = require('express-session');
const productErrors = { message: '' };
//s3 bucket upload files
const { uploadFile } = require('../S3')
//middlewares 
const authenticateAdmin = require('../../../../middlewares/authenticateAdmin');
// upload img
// process.chdir('../');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, `${process.cwd()}/online_shopping/public/assets/uploads`)
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now() + '-' + file.originalname;
//         cb(null, name)
//     }
// })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/assets/uploads/`)
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})
const upload = multer({ storage: storage });
///page
router.get('/', authenticateAdmin, (req, res) => {
    res.render('Admin/createProduct/createProduct.ejs', { admin: req?.session?.admin, errors: productErrors });
});
////
router.post('/', upload.single('img'), async (req, res) => {
    const file = req.file;
    const { name, description, location, arrivalTime, price } = req.body
    if (name === "" || !description === "" || location === "" || arrivalTime === "" || price === 0 || !req.file) {
        productErrors.message = 'can not be empty';
        res.redirect('/products/create');
    }
    else {
        const bucket_result = await uploadFile(file);
        ///////////////success
        const newProduct = new Product({
            ...req.body, ownerId: req.session.admin._id, img: file.filename,
            avilableColors: (req.body.avilableColors).split('-'),
            avilableSizes: (req.body.avilableSizes).split('-')
        });
        await newProduct.save().then((result) => {
            if (!result) {
                productErrors.message = 'something wrong';
                res.redirect('/products/create');
            }
            res.status(200);
            setTimeout(() => res.redirect('/products/admin/get'), 1000);
        }).catch((err) => {
            productErrors.message = err.message;
            res.redirect('/products/create');
        });
        //////////////success
    }

});

module.exports = router;
