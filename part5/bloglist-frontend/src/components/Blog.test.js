import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('By default, blog title and author are rendered, but not url', () => {
  const blog = {
    title: 'Test title',
    author: 'test author',
    url: 'testurl.com',
    likes: 100
  }

  const user = {
    username: 'test'
  }

  const token = 'testtoken123'

  const setBlogs = jest.fn()

  const { container } = render(
    <Blog blog={blog} token={token} user={user} setBlogs={setBlogs} />
  )

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    blog.title
  )

  expect(div).toHaveTextContent(
    blog.author
  )

  expect(div).not.toHaveTextContent(
    blog.url
  )

  expect(div).not.toHaveTextContent(
    blog.likes
  )
})
