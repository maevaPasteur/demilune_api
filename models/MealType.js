const mongoose = require('mongoose');

const mealTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MealType', mealTypeSchema);