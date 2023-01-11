import { useState } from 'react'

const Button = ({ text, eventHandler }) => {
  return (
    <button onClick={eventHandler}>
      {text}
    </button>
  )
}

const Statistics = ({ props }) => {
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </div>
  )
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
      <Statistics props={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  )
}

export default App