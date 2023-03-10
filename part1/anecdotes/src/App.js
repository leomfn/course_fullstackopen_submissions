import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const pointsInitObject = {}
  for (let i = 0; i < anecdotes.length; i++) {
    pointsInitObject[i] = 0
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsInitObject)

  const pointsValues = Object.values(points)
  const maxVotes = Math.max(...pointsValues)
  const bestAnecdoteIndex = pointsValues.indexOf(maxVotes)

  const randomAnecdoteIndex = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  const vote = () => {
    const pointsCopy = { ...points }
    pointsCopy[selected]++    
    return(setPoints(pointsCopy))
  }

  const BestAnecdote = () => {

    if (maxVotes == 0) {
      return(
        <p>No votes yet</p>
      )
    } else {
      return(
        <p>{anecdotes[bestAnecdoteIndex]}</p>
      )
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={vote}>vote</button>
        <button onClick={randomAnecdoteIndex}>next anecdote</button>
      </div>
      <h1>Anecdote with the most votes</h1>
      <BestAnecdote />
      <p>has {maxVotes} votes</p>
    </div>

  )
}

export default App