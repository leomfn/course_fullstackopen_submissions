const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const result = await Blog.findByIdAndDelete(request.params.id)
        result
            ? response.status(204).end()
            : response.status(404).end()
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