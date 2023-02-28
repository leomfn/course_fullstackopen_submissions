import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries('anecdotes')
          dispatch({ type: 'SET', payload: `created anecdote ${content}` })
          setTimeout(
            () => dispatch({ type: 'RESET' }),
            5000
          )
        },
        onError: async () => {
          dispatch({ type: 'SET', payload: 'too short anecdote, must have length 5 or more' })
          setTimeout(
            () => dispatch({ type: 'RESET' }),
            5000
          )
        }
      }
    )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
