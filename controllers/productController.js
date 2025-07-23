const Product = require('../models/Product')
const User = require('../models/User')
const defaultProductImage = 'https://res.cloudinary.com/dp2prqxfo/image/upload/v1753027498/no-image-available-icon-vector_kyibzy.jpg'

const ProductController = {
    async getAllProducts (req, res) {
        try {
            const allProducts = await Product.find()
            res.status(201).json( allProducts )
        } catch (err) {
            res.status(503).json({error: 'There was a problem trying to get all products\nError: '+err})
        }
    },

    async getProductsByUser (req, res) {
        try {
            const user = await User.findOne({name: req.params.user})
            if(user){
                const products = await Product.find({owner: req.params.user}).exec()
                res.status(201).json( products )
            }else{
                res.status(404).json({error: `This user doesn't exist`})
            }
        } catch (err) {
            res.status(503).json({error: `There was a problem trying to get user "${req.params.user}"\nError: ${err}`})
        }
    },

    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.productId)
            res.status(201).json(product)
        } catch (err) {
            res.status(503).json({error: 'There was a problem trying to get the product\nError: '+err})
        }
    },

    async getProductsByName (req, res) {
        try {
            const product = await Product.find({name: new RegExp(req.params.productName, 'i')}).exec()
            res.status(201).json(product)
        } catch (err) {
            res.status(503).json({error: 'There was a problem trying to get the product\nError: '+err})
        }
    },

    async createProduct(req, res) {
        try {
            const {owner, name, description, price} = req.body
            const image = req.file.path || defaultProductImage
            const user = await User.findOne({name: owner})
            if(user){
                const product = await Product.create({owner, name, description, image, price})
                res.status(201).json(product)
            }else{
                res.status(403).json({error: 'This user does not exist'})
            }
        } catch (err) {
            res.status(503).json({error: 'There was a problem trying to create the product\nError: '+err})
        }
    },

    async editProduct (req, res) {
        try {
            const {name, description, price} = req.body
            const image = req.file.path
            const product = await Product.findByIdAndUpdate(req.params.productId, {name, description, image, price}, {new:true})
            res.status(201).json(product)
        } catch (err) {
            res.status(503).json({error: 'There was a problem trying to update the product\nError: '+err})
        }
    },

    async deleteProduct (req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.productId)
            res.status(201).json(product)
        } catch (err) {
            res.status(503).json({error: 'There was a problem trying to delete the product\nError: '+err})
        }
    }
}

module.exports = ProductController