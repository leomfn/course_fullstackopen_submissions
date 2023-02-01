const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

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
        .expect(201)

    // check if object is created correctly
    expect(response.body).toMatchObject(newBlog)

    // check if number of objects increased by one
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1)
})

test.only('missing likes property defaults to 0', async () => {
    const newBlog = {
        title: 'A new title',
        url: 'http://example.com/newblog',
        author: 'John Dorian'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    console.log('id of new entry:', response.body.id)

    expect(response.body.likes).toBe(0)
})

afterAll(async () => {
    await mongoose.connection.close()
})