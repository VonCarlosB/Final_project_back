const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

const multer = require('multer')
const storage = require('../utils/cloudinary')
const upload = multer({ storage })

router.get('/', (req, res) => res.redirect('/products'))

router.get('/products', ProductController.getAllProducts)

router.get('/products/user/:user', ProductController.getProductsByUser)

router.get('/products/id/:productId', ProductController.getProductById)

router.get('/products/name/:productName', ProductController.getProductsByName)

router.post('/products/create', upload.single('image'), ProductController.createProduct)

router.put('/products/:productId', upload.single('image'), ProductController.editProduct)

router.delete('/products/:productId', ProductController.deleteProduct)

module.exports = router