const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

const multer = require('multer')
const storage = require('../utils/cloudinary')
const upload = multer({ storage })

router.get('/users', UserController.getAllUsers)

router.get('/users/:userName', UserController.getUserByName)

router.post('/users/create', upload.single('image'), UserController.createUser)

router.post('/users/login', UserController.login)

router.put('/users/:userId', upload.single('image'), UserController.editUser)

router.delete('/users/:userId', UserController.deleteUser)

module.exports = router