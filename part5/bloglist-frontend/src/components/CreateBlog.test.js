import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

// mock blogService module
import blogService from '../services/blogs'
jest.mock('../services/blogs')

// token, setBlogs, setStatusMessage, blogFormRef

const token = 'testtoken123'

const setBlogs = jest.fn()
const setStatusMessage = jest.fn()
const blogFormRef = { current: { toggleVisibility: jest.fn() } }

let container

beforeEach(() => {
  container = render(
    <CreateBlog
      setStatusMessage={setStatusMessage}
      token={token}
      blogFormRef={blogFormRef}
      setBlogs={setBlogs}
    />
  ).container
})


test.only('new blog form', async () => {
  const testTitle = 'Test title'
  const testAuthor = 'Test Author'
  const testUrl = 'https://example.com/test'

  const titleInput = container.querySelector('input[name="Title"]')
  const authorInput = container.querySelector('input[name="Author"]')
  const urlInput = container.querySelector('input[name="Url"]')
  const sendButton = screen.getByText('create')

  const user = userEvent.setup()

  await user.type(titleInput, testTitle)
  await user.type(authorInput, testAuthor)
  await user.type(urlInput, testUrl)

  await user.click(sendButton)

  expect(blogService.createBlog).toBeCalledTimes(1)
  expect(blogService.createBlog.mock.calls[0][0].title).toBe(testTitle)
  expect(blogService.createBlog.mock.calls[0][0].author).toBe(testAuthor)
  expect(blogService.createBlog.mock.calls[0][0].url).toBe(testUrl)
})
