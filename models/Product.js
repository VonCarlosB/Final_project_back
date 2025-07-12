const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    name:{type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: false},
    price: {type: Number, min:0, required: false}
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product