const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Restaurant la Demi-Lune"
    },
    phone: {
        type: String,
        required: true,
        default: "03 84 72 82 82"
    },
    address: {
        type: String,
        required: true,
        default: "39 Rue Pasteur, 39100 Dole"
    },
    pages: {
        type: Array,
        required: true,
        default: []
    },
    planning: {
        type: Array,
        required: true,
        default: ["19h-22h", "19h-22h", "12h-14h 19h-22H", "12h-14h 19h-22H", "12h-14h 19h-22H", "12h-14h 19h-22H", "12h-14h 19h-22H"]
    }
});

module.exports = mongoose.model('General', generalSchema);