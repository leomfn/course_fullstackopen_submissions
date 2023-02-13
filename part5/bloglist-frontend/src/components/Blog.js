import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const BlogDetails = ({ blog, token, setBlogs, user }) => {
  const likes = blog.likes ? blog.likes : 0
  const ownerActive = blog.user.username === user.username
    ? true
    : false

  const handleLikeBlog = async () => {
    await blogService.likeBlog(blog, token)

    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleDeleteBlog = async () => {
    const deleteConfirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.title}`
    )

    deleteConfirmation && await blogService.deleteBlog(blog, token)

    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  return (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {likes}
        <button onClick={handleLikeBlog}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {ownerActive &&
        <button
          style={{ color: 'white', background: 'red' }}
          onClick={handleDeleteBlog}
        >
          remove
        </button>
      }
    </div>
  )
}

const Blog = ({ blog, token, setBlogs, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlog, setShowBlog] = useState(false)

  const handleShowDetails = () => {
    setShowBlog(!showBlog)
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleShowDetails}>
        {showBlog ? 'hide' : 'view'}
      </button>
      {showBlog &&
        <BlogDetails
          blog={blog}
          token={token}
          setBlogs={setBlogs}
          user={user}
        />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog