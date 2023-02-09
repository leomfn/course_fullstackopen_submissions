import { useState } from "react"

const BlogDetails = ({ blog }) => {
  const likes = blog.likes ? blog.likes : 0
  return (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {likes}
        <button>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )
}

const Blog = ({ blog }) => {

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
      {showBlog && <BlogDetails blog={blog} />}
    </div>
  )
}

export default Blog