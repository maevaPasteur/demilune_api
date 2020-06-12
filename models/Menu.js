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
        default: []
    },
    meals: {
        type: Array,
        required: true,
        default: []
    },
    cheeses: {
        type: Array,
        required: true,
        default: []
    },
    desserts: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Menu', menuSchema);