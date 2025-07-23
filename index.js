const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConnection = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'https://expositorweb.netlify.app',
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({ extended:true, limit: '10mb' }))

app.use(productRoutes, userRoutes)

dbConnection()

app.listen(PORT, () => console.log('Server started on port '+PORT))