const router = require('express').Router()
//middlewares 
const authenticateAdmin = require('../../../middlewares/authenticateAdmin');

//////////////////////////////// Admin //////////////////////////////////
router.use('/', require('./Admin/home'));//finished
router.use('/profile', require('./Admin/profile'));//finished

router.use('/login', require('./Admin/auth/signIn'));//finished
router.use('/logout', require('./Admin/auth/logout'));//finished
router.use('/create', require('./Admin/auth/create'));//finished
router.use('/current-admin', require('./Admin/auth/currentAdmin'));//finished
//products
router.use('/products/create', authenticateAdmin, require('./Admin/createProduct'));//finished
router.use('/products/admin/get', require('./Admin/adminProducts'));//finished
router.use('/product/update', require('./Admin/updateProduct'));//finished
router.use('/product/delete', require('./Admin/deleteProduct'));//finished
router.use('/product/get', require('./Admin/getProduct'));//finished
//users
router.use('/users/get', require('./Admin/users/getUsers'));//finished
router.use('/user/get', require('./Admin/users/getUser'));//finished
router.use('/user/delete', require('./Admin/users/deleteUser'));//finished
router.use('/user/update', require('./Admin/users/updateUser'));//finished

//orders
router.use('/orders/get', require('./Admin/getAllOrders'));//finished
router.use('/order/accept', require('./Admin/acceptOrder'));//finished
router.use('/order/delete', require('./Admin/deleteOrder'));//finished
router.use('/order/get', require('./Admin/getOrderDetails'));//finished
router.use('/orders/add-sales', require('./users/addSales'));//finished
router.use('/orders/update', require('./Admin/updateOrder'));//finished
//////////////////////////////// Admin //////////////////////////////////


//////////////////////////////// User //////////////////////////////////
router.use('/api/users/auth/create', require('./users/auth/createUser'));//finished
router.use('/api/users/auth/login', require('./users/auth/signIn'));//finished
router.use('/api/users/auth/logout', require('./users/auth/logOut'));//finished
router.use('/api/current-user', require('./users/auth/currentUser'));//finished

router.use('/api/users/order', require('./users/order/makeOrder'));//finished
router.use('/api/users/get-order', require('./users/order/getOrder'));//finished
router.use('/api/users/delete-order', require('./users/order/deleteOrder'));//finished


router.use('/api/products/get/most-views', require('./users/products/MostViewed'));//finished
router.use('/api/products/get/sample/feature', require('./users/products/getSampleProductsFeature'));//finished
router.use('/api/products/get/sample/popular', require('./users/products/getSampleProductsPopular'));//finished
router.use('/api/products/get', require('./users/products/getProducts'));//finished
router.use('/api/product/view', require('./users/products/addViewToProduct'));//finished
router.use('/api/product/get', require('./users/products/getProduct'));//finished

//read imgs from AWS_BUCKET
// router.use('/api/img', require('./users/products/getProductImg'));//finished

// payments method

router.use('/api/product/payment', require('./users/payments/payments'));//finished


//////////////////////////////// User //////////////////////////////////

//////////////////////////////// 404 //////////////////////////////////
router.use('*', require('./404/notFounded'));//finished
//////////////////////////////// 404 //////////////////////////////////

module.exports = router



