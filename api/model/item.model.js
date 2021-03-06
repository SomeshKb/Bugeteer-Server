const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    cost: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    contributors: {
        type: Array,
        required: true
    },
    hasSettled: {
        type: Boolean,
        default: false
    }
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Item', schema);