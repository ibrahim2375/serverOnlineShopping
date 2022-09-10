const mongoose = require('mongoose');
const salesSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    productCategory: {
        type: Boolean,
        default: false,
    },
    payMethod:{
        type: String,
    }   
}, { timestamps: true });

module.exports = mongoose.model('Sales', salesSchema);


