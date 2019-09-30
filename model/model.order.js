const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({

    status: {
        type: String,
        required: true,
        default: 'PENDING'
    },

    items: {
        type: Array,
        required: true
    },

    estimatedTotal: {
        type: Number,
        required: true
    },

    siteManager: {
        type: Object,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now()
    }

});

module.exports = mongoose.model('Order', OrderSchema);