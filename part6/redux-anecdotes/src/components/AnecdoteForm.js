import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const [timeoutId, setTimeoutId] = useState(null)

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(add(newAnecdote))
    
    dispatch(setNotification(`created new anecdote '${content}'`))
    clearTimeout(timeoutId)
    setTimeoutId(
      setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm