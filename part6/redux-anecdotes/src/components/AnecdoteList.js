// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  // const [timeoutId, setTimeoutId] = useState(null)

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {
        anecdotes
          .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
    </div>
  )
}

export default AnecdoteList