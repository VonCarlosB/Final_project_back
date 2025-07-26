const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Product = require('../models/Product')
const defaultUserImage = 'https://res.cloudinary.com/dp2prqxfo/image/upload/v1753290203/default-avatar-profile-icon-social-media-user-free-vector_jbv3vd.jpg'

const UserController = {
    async getAllUsers (req, res) {
        try {
            const users = await User.find()
            res.status(201).json(users)
        } catch (err) {
            res.status(503).json({error: 'There was a problem retrieving all users\nError: '+err})
        }
    },

    async getUserByName (req, res) {
        try {
            const users = await User.find({name: new RegExp(req.params.userName, 'i')}).exec()
            if(users.length !== 0){
                res.status(201).json(users)
            }else{
                res.status(404).json({error: `${req.params.userName} is not a user`})
            }
        } catch (err) {
            res.status(503).json({error: 'There was a problem retrieving all users\nError: '+err})
        }
    },

    async createUser (req, res) {
        try {
            const {name, password} = req.body

            const user = await User.findOne({ name })
            if(user){
                res.status(403).json({error: 'El usuario ya existe'})
            }else{
                const hashed = await bcrypt.hash(password, 10)
                const newUser = await User.create({
                    name, 
                    password:hashed, 
                    description:'Este usuario aún no tiene una descripción', 
                    image:defaultUserImage, 
                    age:0})

                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
                res.status(201).json({ token })
            }
        } catch (err) {
            res.status(503).json({error: 'Could not create the user\nError: '+err})
        }
    },

    async login (req, res){
        const { name, password } = req.body
        try {
            const user = await User.findOne({ name })
            if(!user || !(await bcrypt.compare(password, user.password))){
                return res.status(403).json({ error: 'Credenciales incorrectas' })
            }else{
                const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET)
                res.status(201).json({ token })
            }
        } catch (err) {
            res.status(500).json({ error: 'Error al iniciar sesión\nError:'+err })
        }
    },

    async editUser (req, res) {
        try {
            const {password, description, age} = req.body
            const image = req.file ? req.file.path : defaultUserImage
            const user = await User.findByIdAndUpdate(req.params.userId, {password, description, image, age}, {new:true})
            res.status(201).json(user)
        } catch (err) {
            res.status(503).json({ error: 'There was a problem trying to delete the user\nError: '+err })
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId)
            console.log(user)
            const products = await Product.deleteMany({ owner:user.name })
            res.status(201).json({error: 'User and its products have been deleted'})
        } catch (err) {
            res.status(503).json({error: 'There was a problem trying to delete the user\nError: '+err})
        }
    }
}

module.exports = UserController