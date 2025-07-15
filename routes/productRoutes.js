const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')

router.get('/', (req, res) => res.redirect('/products'))

router.get('/products', async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(201).send(allProducts)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to get all products', error})
    }
})

router.get('/products/user/:user', async (req, res) => {
    try {
        const user = await User.find({name: req.params.user}).exec()
        if(user.length !== 0){
            const products = await Product.find({owner: req.params.user}).exec()
            res.status(201).send(products)
        }else{
            res.status(404).send({message: `This user doesn't exist`})
        }
    } catch (error) {
        res.status(500).send({message: `There was a problem trying to get user '${req.params.user}'\nError: ${error}`})
    }
})

router.get('/products/id/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to get the product', error})
    }
})

router.get('/products/name/:productName', async (req, res) => {
    try {
        const product = await Product.find({name: new RegExp(req.params.productName, 'i')}).exec()
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to get the product', error})
    }
})

router.post('/products/create', async (req, res) => {
    try {
        const {owner, name, description, image, price} = req.body
        const user = await User.find({name: owner}).exec()
        if(user.length !== 0){
            const product = await Product.create({owner, name, description, image, price})
            res.status(201).send(product)
        }else{
            res.status(201).send({message: 'This user does not exist'})
        }
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to create the product', error})
    }
})

router.put('/products/:productId', async (req, res) => {
    try {
        const {owner, name, description, image, price} = req.body
        const product = await Product.findByIdAndUpdate(req.params.productId, {owner, name, description, image, price}, {new:true})
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to update the product\nError: '+error})
    }
})

router.delete('/products/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to delete the product\nError: '+error})
    }
})

module.exports = router