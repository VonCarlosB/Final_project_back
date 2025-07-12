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
            if(products.length !== 0){
                res.status(201).send(products.json())
            }else{
                res.status(201).send({message: `This user doesn't have any products yet`})
            }
        }else{
            res.status(201).send({message: `This user doesn't exist`})
        }
    } catch (error) {
        res.status(500).send({message: `There was a problem trying to get user '${req.params.user}'`, error})
    }
})

router.get('/products/product/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
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

router.delete('/products/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to delete the product', error:error})
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send({message: 'There was a problem retrieving all users', error})
    }
})

router.post('/users/create', async(req, res) => {
    try {
        const {name, password, description, image, age} = req.body
        const user = await User.find({name:name}).exec()
        if(user.length !== 0){
            res.status(201).send({message: 'This user already exists'})
        }else{
            const newUser = await User.create({name, password, description, image, age})
            res.status(201).send(newUser)
        }
    } catch (error) {
        res.status(500).send({message: 'Could not create the user', error})
    }
})

router.delete('/users/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to delete the user', error:error})
    }
})

module.exports = router