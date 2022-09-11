const mongoose = require('mongoose');
const salesSchema = new mongoose.Schema({
    productName: {
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
    category: {
        type: String,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Sales', salesSchema);


