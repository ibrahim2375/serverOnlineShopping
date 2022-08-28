const router = require('express').Router()

//////////////////////////////// Admin //////////////////////////////////
router.use('/', require('./Admin/home'));//finished
router.use('/profile', require('./Admin/profile'));//finished

router.use('/login', require('./Admin/auth/signIn'));//finished
router.use('/logout', require('./Admin/auth/logout'));//finished
router.use('/create', require('./Admin/auth/create'));//finished

router.use('/products/create', require('./Admin/createProduct'));//finished
router.use('/products/admin/get', require('./Admin/adminProducts'));//finished
// router.use('/products/get', require('./Admin/getProducts'));
//////////////////////////////// Admin //////////////////////////////////




//////////////////////////////// User //////////////////////////////////
router.use('/api/users/auth/create', require('./users/auth/createUser'));//finished
router.use('/api/users/auth/login', require('./users/auth/signIn'));//finished
router.use('/api/users/auth/logout', require('./users/auth/logOut'));//finished
router.use('/api/current-user', require('./users/auth/currentUser'));//finished

router.use('/api/users/order', require('./users/order/makeOrder'));//finished
router.use('/api/users/get-order', require('./users/order/getOrder'));//finished
router.use('/api/users/delete-order', require('./users/order/deleteOrder'));//finished


router.use('/api/products/get/sample/feature', require('./users/products/getSampleProductsFeature'));//finished
router.use('/api/products/get/sample/popular', require('./users/products/getSampleProductsPopular'));//finished
router.use('/api/products/get', require('./users/products/getProducts'));//finished
router.use('/api/product/view', require('./users/products/addViewToProduct'));//finished

//////////////////////////////// User //////////////////////////////////





//////////////////////////////// 404 //////////////////////////////////
router.use('*', require('./404/notFounded'));//finished
//////////////////////////////// 404 //////////////////////////////////

module.exports = router





























// //pages

// ///user
// router.use('/api/user/get', require('./users/getUser'));
// router.use('/api/users/get', require('./users/getUsers'));
// router.use('/api/users/update', require('./users/updateUser'));
// router.use('/api/users/delete', require('./users/deleteUser'));
// router.use('/api/users/add-to-favorites', require('./users/favorites/favorites'));

// //finished



// //products
// router.use('/api/products/update', require('./products/updateProduct'));
// router.use('/api/products/delete', require('./products/deleteProduct'));

// finished