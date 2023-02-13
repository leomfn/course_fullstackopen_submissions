import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  test.only('URL and number of likes are shown when button is clicked', async () => {
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
})