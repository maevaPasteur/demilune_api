const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('component', componentSchema);