import { useState } from "react"
import blogService from '../services/blogs'

const BlogDetails = ({ blog, token, setBlogs }) => {
  const likes = blog.likes ? blog.likes : 0

  const handleLikeBlog = async () => {
    await blogService.likeBlog(blog, token)

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
    </div>
  )
}

const Blog = ({ blog, token, setBlogs }) => {

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
    <div style={blogStyle} >
      {blog.title} {blog.author}
      <button onClick={handleShowDetails}>
        {showBlog ? 'hide' : 'view'}
      </button>
      {showBlog &&
        <BlogDetails
          blog={blog}
          token={token}
          setBlogs={setBlogs}
        />}
    </div>
  )
}

export default Blog