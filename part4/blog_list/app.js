const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// app.use(middleware.errorHandler)

module.exports = app