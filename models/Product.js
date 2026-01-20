const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0.01 },
    inStock: { type: Boolean, default: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);