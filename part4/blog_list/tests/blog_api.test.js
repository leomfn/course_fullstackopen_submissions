const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('correct number of notes are returned are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier ist named id', async () => {
    const response = await api.get('/api/blogs')

    const identifierCheck = response.body.map(blog => blog.id)
    identifierCheck.forEach(id => expect(id).toBeDefined())
})

test('post new entry to database and check content', async () => {
    // create user
    const newUser = {
        username: 'maxmustermann',
        name: 'Max Mustermann',
        password: 'badpassword'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

    // login and get token
    const loginResponse = await api
        .post('/api/login')
        .send({ username: newUser.username, password: newUser.password })

    const authorization = `Bearer ${loginResponse.body.token}`

    // create new blog
    const newBlog = {
        title: 'A new title',
        url: 'http://example.com/newblog',
        author: 'John Dorian',
        likes: 42
    }

    // check status code
    const response = await api
        .post('/api/blogs')
        .set('Authorization', authorization)
        .send(newBlog)
        .expect(201)

    // check if object is created correctly
    expect(response.body).toMatchObject(newBlog)

    // check if number of objects increased by one
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1)
})

test.only('respond with status 401 unauthorized, if no token is provided', async () => {
    // create new blog
    const newBlog = {
        title: 'A new title',
        url: 'http://example.com/newblog',
        author: 'John Dorian',
        likes: 42
    }

    // check status code
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

test('missing likes property defaults to 0', async () => {
    const newBlog = {
        title: 'A new title',
        url: 'http://example.com/newblog',
        author: 'John Dorian'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    expect(response.body.likes).toBe(0)
})

test('status code 400 if title or url are missing', async () => {
    const blogMissingUrl = {
        title: 'A new title',
        author: 'John Dorian'
    }

    const blogMissingTitle = {
        url: 'http://example.com/newblog',
        author: 'John Dorian'
    }

    await api
        .post('/api/blogs')
        .send(blogMissingUrl)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(blogMissingTitle)
        .expect(400)
})

describe('delete a blog', () => {
    test('successfully delete existing id', async () => {
        const response = await api.get('/api/blogs')
        const allBlogs = response.body
        const firstId = allBlogs[0].id
        await api.delete(`/api/blogs/${firstId}`)
            .expect(204)
    })

    test('status code 404 when trying to delete already deleted id', async () => {
        const response = await api.get('/api/blogs')
        const allBlogs = response.body
        const firstId = allBlogs[0].id
        await api.delete(`/api/blogs/${firstId}`)
            .expect(204)
        await api.delete(`/api/blogs/${firstId}`)
            .expect(404)
    })

    test('status code 400 when trying to delete invalid id', async () => {
        const invalidId = 123
        await api.delete(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('update a blog', () => {
    test('update the likes count', async () => {
        const response = await api.get('/api/blogs')
        const firstBlog = response.body[0]
        const blogId = firstBlog.id
        const oldLikes = firstBlog.likes
        const newLikes = oldLikes + 10

        const updatedBlog = await api
            .put(`/api/blogs/${blogId}`)
            .send({ likes: newLikes })
            .expect(200)

        // compare objects
        firstBlogUpdated = { ...firstBlog }
        firstBlogUpdated.likes = newLikes

        expect(updatedBlog.body).toMatchObject(firstBlogUpdated)
    })

    test('status 400 when updating a non existing field', async () => {
        const response = await api.get('/api/blogs')
        const firstBlog = response.body[0]
        const blogId = firstBlog.id
        await api
            .put(`/api/blogs/${blogId}`)
            .send({ nonexisting: 'test' })
            .expect(400)
    })
})

describe('when user is created', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('successfully create user', async () => {
        const newUser = {
            username: 'maxmustermann',
            name: 'Max Mustermann',
            password: 'badpassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('username too short', async () => {
        const newUser = {
            username: '12',
            name: 'Max Mustermann',
            password: 'badpassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('shorter than the minimum allowed length')
    })

    test('password too short', async () => {
        const newUser = {
            username: 'maxmustermann',
            name: 'Max Mustermann',
            password: '12'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password too short')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})