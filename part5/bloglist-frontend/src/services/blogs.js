import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(
    baseUrl,
    blog,
    config
  )
  return response.data
}

const likeBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: token }
  }

  const newLikes = blog.likes ? blog.likes + 1 : 1
  const newBlog = {
    ...blog,
    likes: newLikes,
    user: blog.user.id
  }

  const response = await axios.put(
    baseUrl + '/' + blog.id,
    newBlog,
    config
  )
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, likeBlog }