import { useState } from "react"
import blogService from '../services/blogs'

const CreateBlog = ({ token, setBlogs }) => {
  // state
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  // event handlers
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    await blogService.createBlog(
      {
        title, author, url
      },
      token
    )

    const blogs = await blogService.getAll()
    setBlogs(blogs)

    // alternatively, just add the response to blogs array (also add blogs to function parameters):
    // const newBlogs = blogs.concat({title, author, url})
    // setBlogs(newBlogs)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog