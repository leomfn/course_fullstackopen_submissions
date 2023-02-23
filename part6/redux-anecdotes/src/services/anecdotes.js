import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const reponse = await axios.get(baseUrl)
  console.log('recieved response from anecdotes service function getAll')
  return reponse.data
}

export default { getAll }