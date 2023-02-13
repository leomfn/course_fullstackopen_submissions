import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// mock blogService module
import blogService from '../services/blogs'
jest.mock('../services/blogs')

describe('<Blog /> component', () => {
  const blog = {
    title: 'Test title',
    author: 'test author',
    url: 'testurl.com',
    likes: 100,
    user: {
      username: 'test'
    }
  }

  const user = {
    username: 'test'
  }

  const token = 'testtoken123'

  const setBlogs = jest.fn()

  let container

  beforeEach(() => {

    container = render(
      <Blog blog={blog} token={token} user={user} setBlogs={setBlogs} />
    ).container
  })

  test('By default, blog title and author are rendered, but not url', () => {
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

  test('URL and number of likes are shown when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      blog.url
    )

    expect(div).toHaveTextContent(
      blog.likes
    )
  })

  test.only('Event handler for like button is called twice when button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.likeBlog).toBeCalledTimes(2)
  })
})