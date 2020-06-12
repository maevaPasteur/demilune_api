const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Page', pageSchema);