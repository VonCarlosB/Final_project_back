const Product = require('../models/Product')
const User = require('../models/User')

const ProductController = {
    async getAllProducts (req, res) {
        try {
            const allProducts = await Product.find()
            res.status(201).send(allProducts)
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to get all products\nError: '+error})
        }
    },

    async getProductsByUser (req, res) {
        try {
            const user = await User.find({name: req.params.user}).exec()
            if(user.length !== 0){
                const products = await Product.find({owner: req.params.user}).exec()
                res.status(201).send(products)
            }else{
                res.status(404).send({message: `This user doesn't exist`})
            }
        } catch (error) {
            res.status(503).send({message: `There was a problem trying to get user "${req.params.user}"\nError: ${error}`})
        }
    },

    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.productId)
            res.status(201).send(product)
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to get the product\nError: '+error})
        }
    },

    async getProductsByName (req, res) {
        try {
            const product = await Product.find({name: new RegExp(req.params.productName, 'i')}).exec()
            res.status(201).send(product)
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to get the product\nError: '+error})
        }
    },

    async createProduct(req, res) {
        try {
            const {owner, name, description, price} = req.body
            const image = req.file.path
            const user = await User.find({name: owner}).exec()
            if(user.length !== 0){
                const product = await Product.create({owner, name, description, image, price})
                res.status(201).send(product)
            }else{
                res.status(403).send({message: 'This user does not exist'})
            }
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to create the product\nError: '+error})
        }
    },

    async editProduct (req, res) {
        try {
            const {name, description, price} = req.body
            const image = req.file.path
            const product = await Product.findByIdAndUpdate(req.params.productId, {name, description, image, price}, {new:true})
            res.status(201).send(product)
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to update the product\nError: '+error})
        }
    },

    async deleteProduct (req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.productId)
            res.status(201).send(product)
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to delete the product\nError: '+error})
        }
    }
}

module.exports = ProductController