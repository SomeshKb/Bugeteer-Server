const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String },
    buyer: { type: String, required: true },
    contributors: { type: Array}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Item', schema);