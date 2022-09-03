import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  
  const sumAll = () => props.good + props.neutral + props.bad

  const average = () => {
    if (sumAll() === 0) return 0
    return (props.good * 1 + props.bad * -1) / sumAll()
  }

  const positivePct = () => {
    if (props.good === 0) return 0 
    return props.good / sumAll() * 100
  }

  return (
  <div>
    <h1>Statistics</h1>
    <br/>

    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>

    <p>all {sumAll()}</p>
    <p>average {average()}</p>
    <p>positive {positivePct()}%</p>

  </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App