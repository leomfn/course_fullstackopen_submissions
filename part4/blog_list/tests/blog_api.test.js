const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('test database entries deleted')

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
    console.log('initial entries saved to database')

})

test('correct number of notes are returned are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test.only('unique identifier ist named id', async () => {
    const response = await api.get('/api/blogs')
    
    const identifierCheck = response.body.map(blog => blog.id)
    identifierCheck.forEach(id => expect(id).toBeDefined())
})

afterAll(async () => {
    await mongoose.connection.close()
})