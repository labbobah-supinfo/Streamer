require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const router = require('./router/route')
const colors = require('colors')
const { urlencoded } = require('body-parser')


const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./router/route'))

connectDB()

app.listen(port, () => {
    console.log(`app listen on port ${port}`)
})