import { useState } from 'react'

const Button = ({ text, eventHandler }) => {
  return (
    <button onClick={eventHandler}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value, extra }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {extra}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={good / total * 100} extra="%" />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveFeedback = (rating) => () => {
    switch (rating) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      default:
        setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' eventHandler={giveFeedback('good')} />
      <Button text='neutral' eventHandler={giveFeedback('neutral')} />
      <Button text='bad' eventHandler={giveFeedback('bad')} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App