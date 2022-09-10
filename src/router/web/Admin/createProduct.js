const Product = require('../../../../models/Product');
const express = require('express');
const createError = require('../../../errors/errorHandle')
const router = express.Router();
const multer = require('multer');
const session = require('express-session');
const productErrors = { message: '' };
//s3 bucket upload files
// const { uploadFile } = require('../S3')

/////////////////////////////img/////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/assets/uploads/`)
    },
    filename: function (req, file, cb) {
        const name = Date.now() + file.originalname;
        cb(null, name)
    }
})
const upload = multer({ storage: storage });
/////////////////////////////img/////////////////////////////

router.post('/', upload.single('img'), async (req, res, next) => {
    const file = req.file;
    const { avilableColors, avilableSizes } = req.body
    console.log(avilableColors)
    if (!file) {
        next(createError(403, 'something wrong'));
    }
    else {
        // const bucket_result = await uploadFile(file);
        // ///////////////success
        const newProduct = new Product({
            ...req.body, ownerId: req.session.admin._id, img: file.filename,
            avilableColors: avilableColors === '' ? [] : avilableColors.split(','),
            avilableSizes: avilableSizes === '' ? [] : avilableSizes.split(','),
        });
        await newProduct.save().then((result) => {
            if (!result) {
                next(createError(403, 'something wrong'));
            }
            res.status(200).send(result);
        }).catch((err) => {
            next(createError(err.status, err.message));
        });
        ////////////success
    }

});

module.exports = router;
