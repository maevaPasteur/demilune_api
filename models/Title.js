const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Title', titleSchema);