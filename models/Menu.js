const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    starters: {
        type: Array,
        required: true,
        default: [String]
    },
    meals: {
        type: Array,
        required: true,
        default: [String]
    },
    desserts: {
        type: Array,
        required: true,
        default: [String]
    }
});

module.exports = mongoose.model('Menu', menuSchema);