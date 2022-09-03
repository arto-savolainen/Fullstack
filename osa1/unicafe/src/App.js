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
    if (props.good === 0) return "0%"
    return props.good / sumAll() * 100 + "%"
  }

  if (sumAll() > 0) 
    return (
      <div>
        <StatisticsHeader />

        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />

        <StatisticsLine text="all" value={sumAll()} />
        <StatisticsLine text="average" value={average()} />
        <StatisticsLine text="positive" value={positivePct()} />
      </div>
    )
  
  return (
    <div>
      <StatisticsHeader />
      <p>No feedback given</p>
    </div>
  )
}

const StatisticsHeader = () => <h1>statistics</h1>

const StatisticsLine = ({text, value}) => {
  return <p>{text} {value}</p>
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