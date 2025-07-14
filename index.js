const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConnection = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(productRoutes, userRoutes)

dbConnection()

app.listen(PORT, () => {
    console.log('Server started on port '+PORT)
})