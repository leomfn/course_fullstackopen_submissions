import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const reponse = await axios.get(baseUrl)
  console.log('recieved response from anecdotes service function getAll')
  return reponse.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

// eslint-disable-next-line
export default { getAll, createNew }