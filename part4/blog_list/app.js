const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

const mongoUrl = config.MONGODB_URI
mongoose
    .connect(mongoUrl)
    .then(() => console.log('connected to mongoDB'))
    .catch(error => console.log('error'))

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app