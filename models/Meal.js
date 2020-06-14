const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    infos: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    variant_1_title: {
        type: String,
        required: false
    },
    variant_1_price: {
        type: Number,
        required: false
    },
    variant_2_title: {
        type: String,
        required: false
    },
    variant_2_price: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Meal', mealSchema);