// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  // const [timeoutId, setTimeoutId] = useState(null)

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))

    dispatch(setNotification(`created new anecdote '${content}'`, 5))
    // clearTimeout(timeoutId)
    // setTimeoutId(
    //   setTimeout(() => {
    //     dispatch(removeNotification())
    //   }, 5000)
    // )
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