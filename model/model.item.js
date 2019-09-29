const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    unitPrice: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model('Item', ItemSchema);