const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find()
        allProducts.length !== 0 ? res.status(201).send(allProducts) : res.status(201).send({message: 'There are no products'})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to get all products'})
    }
})

module.exports = router