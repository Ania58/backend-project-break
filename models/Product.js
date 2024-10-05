const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true},  
    Description: {
        type: String,
        required: true},
    Image: {
        type: String,
        required: true},
    Category: {
        type: String,
        required: true},
    Size: {
        type: Number,
        required: true},
    Price: {
        type: Number,
        required: true}
}, 
{ timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;