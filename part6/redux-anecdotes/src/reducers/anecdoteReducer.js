import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      return state.map(a => a.id === id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : a
      )
    },
    add(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, add, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer