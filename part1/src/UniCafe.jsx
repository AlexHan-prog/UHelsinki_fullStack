import { useState } from "react"


const Header = ({text}) => <h1>{text}</h1>


const Button = ({onClick, text}) => 
  <button onClick={onClick}> {text} </button>

const Statistic = ({text, number}) => 
  <td>{text} {number}</td>

const Statistics = ({good, neutral, bad, all, avg, positive}) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <tr><Statistic text='good' number={good} /></tr>
          <tr><Statistic text='neutral' number={neutral} /></tr>
          <tr><Statistic text='bad' number={bad} /></tr>
          <tr><Statistic text='all' number={all} /></tr>
          <tr><Statistic text='average' number={avg} /></tr>
          <tr><Statistic text='positive' number={positive} /></tr>
        </tbody>
      </table>
    )
  }
}

const UniCafe = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = (good) => {
    setGood(good)
    setAll(all + 1)
  }

   const handleBad = (bad) => {
    setBad(bad)
    setAll(all + 1)
  }

   const handleNeutral = (neutral) => {
    setNeutral(neutral)
    setAll(all + 1)
  }

  const calculateAverage = (good, bad, total) => ((good - bad) / (total))
  
  const calculatePositivePercentage = (good, total) => {
    return ((good / total) * 100) + " %"
  }

  return (
    <div>
      <div>
        <Header text='give feedback' />
        <Button onClick={() => handleGood(good + 1)} text='good' />
        <Button onClick={() => handleNeutral(neutral + 1)} text='neutral' />
        <Button onClick={() => handleBad(bad + 1)} text='bad' />
      </div>
      <div>
        <Header text='statistics' />
        <Statistics good={good} bad={bad} 
        neutral={neutral} all={all} avg={calculateAverage(good, bad, all)}
        positive={calculatePositivePercentage(good, all)} />
      </div>
    </div>
  )
}

export default UniCafe