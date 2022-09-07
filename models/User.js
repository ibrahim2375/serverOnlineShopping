const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    ban: {
        type: Boolean,
    },
    img: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    number: {
        type: String,
        required: true,
    },
    purchases: {
        type: Array,
    },
    favorites: {
        type: Array,
    },
    card: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);