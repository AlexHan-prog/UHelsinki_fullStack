import Note from "./part2/components/Note"
import { useState, useEffect } from "react"
import axios from 'axios'
import noteService from "./services/notes"
import Notification from "./part2/components/Notification"
import Footer from './part2/components/Footer'

const NotesApp = () => {
  console.log("new render")
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // if 2nd parameter [], then useEffect is only run 
  // after the 1st render (2nd render only)
  // useEffect never runs on the first render
  useEffect(() => {
    console.log("use effect called")
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  console.log("notes to show: ", notesToShow)

  const addNote = (event) => {
    
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
    .then(response => {
      setNotes(notes.concat(response)) // remember response.data not noteObject, since it might fail
      setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id) // ref to item in notes arr
    const changedNote = { ...note, important: !note.important }

    noteService
    .update(id, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id === id ? response : note))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }


  return (
    <div>
      <h1>Notes and More</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote} >
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default NotesApp