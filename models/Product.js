const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true},  
    description: {
        type: String,
        required: true},
    image: {
        type: String,
        required: true},
    category: {
        type: String,
        required: true},
    size: {
        type: Number,
        required: true},
    price: {
        type: Number,
        required: true}
}, 
{ timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;