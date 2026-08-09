import { useState } from 'react'

const Button = ({text, onClick}) => 
    <button onClick={onClick}>{text}</button>

const Votes = ({text}) => {
    if (text) {
        return (
            <p>has {text} votes</p>
        )
    } else {
        return (
            <p>has 0 votes</p>
        )
    }
}

const MostVoted = ({votes, anecdotes}) => {
    // create copy of votes
    // find maximum
    // return anecdotes[maximum]
    const copy = {...votes}
    let maxVal = 0
    if (Object.keys(copy).length != 0) {
        maxVal = Math.max(...Object.values(copy))
        for (const key in copy) {
            if (copy[key] == maxVal) {
                return (
                    <p>{anecdotes[key]}</p>
                )
            }
        }

    } else {
        return (
            <p>No paragraph has any votes yet</p>
        )
    }
}


const Anecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const generateRandom =  () => {
    // generate random number
    // setSelected(random number)
    let randomNumber = Math.floor(Math.random() * 8)
    console.log(randomNumber)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    console.log(selected)
    const copy = {...votes}
    if (copy[selected]) {
        copy[selected] += 1
    } else {
        copy[selected] = 1
    }
    
    console.log(copy)
    setVotes(copy)
  }

  return (
    <>
    <div>
      {anecdotes[selected]}
    </div>
    <div>
        <Votes text={votes[selected]} />
    </div>
    <Button onClick={handleVote} text='vote' />
    <Button onClick={generateRandom} text='next anecdote' />
    <div>
        <h1>Anecdote with most votes</h1>
        <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
    </>
  )
}

export default Anecdotes