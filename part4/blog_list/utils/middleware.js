const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    }
  
    next(error)
  }

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
  } else {
      request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  // console.log(request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log(decodedToken)
  const user = await User.findById(decodedToken.id)
  // console.log(user)
  request.user = user

  next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}