import { useState, useEffect } from 'react'
import phoneService from './services/phoneNumbers'
import Notification from './components/Notification'

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.filterText} onChange={props.onChange}/>
    </div>
  )
}
 
// updatePerson, newName, number, setNewName, setNumber
const PersonForm = (props) => {
  return (
    <form onSubmit={props.updatePerson}>
        <div>
          name: <input value={props.newName} onChange={props.setNewName}/>
        </div>
        <div>number: <input value={props.number} onChange={props.setNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({persons, filterText, handleDeletePerson}) => {
  return (
    <div>
        <ul>
          {persons.map((p) => {
            if (p.name.toLowerCase().includes(filterText.toLowerCase())) {
              return (
                <li key={p.name}>{p.name} {p.number} 
                <button onClick={() => handleDeletePerson(p.name, p.id)}>delete</button> 
                </li>
                
              )
            } 
            
          })}
        </ul>
    </div>
  )
}

const AppPhoneBook = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')

  useEffect( () => {
    phoneService.getAll()
    .then(person => setPersons(person))
  }, [])

  const handleSetNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleSetNumber = (event) => {
    setNumber(event.target.value)
  }


  const handleUpdatePersons = (event) => {
    event.preventDefault()

    const names = persons.map((p) => p.name)

    if (names.includes(newName)) {
      const confirmation = confirm(`${newName} is already added to phonebook, replace the old number with a new number?`)

      // changing number of person already in phoneBook
      if (confirmation) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number : number}
        const changedPersonId = changedPerson.id
        phoneService
        .update(changedPersonId, changedPerson)
        .then(changedPerson => setPersons(
        persons.map(person => person.id === changedPersonId ? changedPerson : person)))
        .catch(error => {
          setDisplayMessage(`Information of ${newName} has already been removed from the server`)
          setTimeout(() => setDisplayMessage(''), 5000)
          setPersons(persons.filter(p => p.name !== newName))
        }
        )


        setDisplayMessage(`Changed ${newName}'s number to ${number}`)
        setTimeout(() => setDisplayMessage(''), 5000)
      }
    } else {
      const newPerson = {
        name : newName,
        number : number
      }
      // call the service to create a new number
      phoneService.create(newPerson)
      .then(newPerson => setPersons(persons.concat(newPerson)))

      setDisplayMessage(`Added ${newName}`)
      setTimeout(() => setDisplayMessage(''), 5000)
    }
    
  }

  const handleSetFilterText = (event) => {
    setFilterText(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
    const confirmation = confirm(`Delete ${name} ?`)
    if (confirmation) {
      phoneService.remove(id)
      .then(deletedPerson => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={displayMessage} />

      <Filter filterText={filterText} onChange={handleSetFilterText} />

      <h2>add a new</h2>

      <PersonForm updatePerson={handleUpdatePersons} 
      newName={newName}
      setNewName={handleSetNewName}
      number={number}
      setNumber={handleSetNumber} 
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filterText={filterText} handleDeletePerson={handleDeletePerson}/>
      
    </div>
  )
}

// need: 1. form onSubmit and an eventhandler that concats new person to persons
// 2. input attributes should be changed to have value={newName} and onChange={}

export default AppPhoneBook