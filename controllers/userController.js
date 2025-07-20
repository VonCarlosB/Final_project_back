const User = require('../models/User')

const UserController = {
    async getAllUsers (req, res) {
        try {
            const users = await User.find()
            res.status(201).send(users)
        } catch (error) {
            res.status(503).send({message: 'There was a problem retrieving all users\nError: '+error})
        }
    },

    async getUserByName (req, res) {
        try {
            const users = await User.find({name: new RegExp(req.params.userName, 'i')}).exec()
            if(users.length !== 0){
                res.status(201).send(users)
            }else{
                res.status(404).send({message: `${req.params.userName} is not a user`})
            }
        } catch (error) {
            res.status(503).send({message: 'There was a problem retrieving all users \nError: '+error})
        }
    },

    async createUser (req, res) {
        try {
            const {name, password, description, age} = req.body
            const image = req.file.path
            const user = await User.find({name:name}).exec()
            if(user.length !== 0){
                res.status(403).send({message: 'This user already exists'})
            }else{
                const newUser = await User.create({name, password, description, image, age})
                res.status(201).send(newUser)
            }
        } catch (error) {
            res.status(503).send({message: 'Could not create the user', error})
        }
    },

    async editUser (req, res) {
        try {
            const {name, password, description, age} = req.body
            const image = req.file.path
            const user = await User.findByIdAndUpdate(req.params.userId, {name, password, description, image, age}, {new:true})
            res.status(201).send(user)
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to delete the user', error:error})
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId)
            res.status(201).send({message: 'User has been deleted'})
        } catch (error) {
            res.status(503).send({message: 'There was a problem trying to delete the user', error:error})
        }
    }
}

module.exports = UserController