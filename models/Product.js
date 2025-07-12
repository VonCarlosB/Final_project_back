const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    name:{type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: false}
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product