const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send({message: 'There was a problem retrieving all users', error})
    }
})

router.get('/users/:userName', async (req, res) => {
    try {
        const users = await User.find({name: new RegExp(req.params.userName, 'i')}).exec()
        if(users.length !== 0){
            res.status(201).send(users)
        }else{
            res.status(404).send({message: `${req.params.userName} is not a user`})
        }
    } catch (error) {
        res.status(500).send({message: 'There was a problem retrieving all users \nError: '+error})
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

router.put('/users/:userId', async (req, res) => {
    try {
        const {name, password, description, image, age} = req.body
        const user = await User.findByIdAndUpdate(req.params.userId, {name, password, description, image, age}, {new:true})
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to delete the user', error:error})
    }
})

router.delete('/users/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        res.status(201).send({message: 'User has been deleted'})
    } catch (error) {
        res.status(500).send({message: 'There was a problem trying to delete the user', error:error})
    }
})

module.exports = router