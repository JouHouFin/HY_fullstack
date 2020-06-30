import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p style={{color: "green"}}>Good: {good}</p>
      <p style={{color: "blue"}}>Neutral: {neutral}</p>
      <p style={{color: "red"}}>Bad: {bad}</p>
      <br />
      <p>Feedbacks given: {good + neutral + bad}</p>
      <p>Average feedback score: {(good + neutral*0.0 + bad*-1) / (good + neutral + bad)}</p>
      <p>Percentage of positive feedback: {(good) / (good + neutral + bad) * 100}%</p>
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