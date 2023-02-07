const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({}).populate('user', { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    try {
        const body = request.body

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const user = request.user

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        const blog = await Blog.findById(request.params.id)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        if (decodedToken.id !== blog.user.toString()) {
            return response.status(401).json({ error: 'item is owned by another user' })
        }

        const result = await Blog.findByIdAndDelete(request.params.id)

        result
            ? response.status(204).end()
            : response.status(404).end()

        // remove blog from user document in users collection
        const user = request.user
        user.blogs = user.blogs.filter(b => b._id.toString() !== request.params.id)
    } catch (exception) {
        response.status(400).end()
    }
})

// update likes
blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        if (body.likes === undefined) {
            response.status(400).end()
        } else {
            const blog = { likes: body.likes }
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            response.json(updatedBlog)
        }

    } catch (exception) {
        response.status(400).end()
    }
})

module.exports = blogsRouter