import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value, color}) => <p style={{color: color}}>{text}: {value}</p>

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <p>No feedback given yet.</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text={"Good"} value={good} color={"green"} />
      <StatisticLine text={"Neutral"} value={neutral} color={"blue"} />
      <StatisticLine text={"Bad"} value={bad} color={"red"} />
      <br />
      <StatisticLine text={"Feedbacks given"} value={good + neutral + bad} />
      <StatisticLine text={"Average feedback score"} value={(good + neutral*0.0 + bad*-1) / (good + neutral + bad)} />
      <StatisticLine text={"Percentage of positive (good) feedback"} value={(good) / (good + neutral + bad) * 100} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text={"Good"}/>
      <Button handleClick={handleNeutral} text={"Neutral"}/>
      <Button handleClick={handleBad} text={"Bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)