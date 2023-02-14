import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  // ref hooks
  const blogFormRef = useRef()

  // effect hooks
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const currentUser = window.localStorage.getItem('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  // event handlers
  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login(
        {
          username,
          password
        }
      )
      window.localStorage.setItem(
        'currentUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000
      )
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('currentUser')
  }

  // conditional app components

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage &&
        <div style={{
          backgroundColor: 'red',
          color: 'white',
          margin: '10px 0',
          padding: '10px'
        }}>
          {errorMessage}
        </div>
        }
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {statusMessage}
      </div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <CreateBlog
          token={`Bearer ${user.token}`}
          blogs={blogs}
          setBlogs={setBlogs}
          setStatusMessage={setStatusMessage}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      <div>
        {blogs
          .map((b) => b.likes ? { ...b, likes: b.likes } : { ...b, likes: 0 })
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              token={`Bearer ${user.token}`}
              setBlogs={setBlogs}
              user={user}
            />
          )}
      </div>
    </div>
  )
}

export default App