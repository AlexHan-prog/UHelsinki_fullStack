import { useState } from 'react'

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

const Persons = ({persons, filterText}) => {
  return (
    <div>
        <ul>
          {persons.map((p) => {
            if (p.name.toLowerCase().includes(filterText.toLowerCase())) {
              return (
                <li key={p.name}>{p.name} {p.number}</li>
              )
            } 
            
          })}
        </ul>
    </div>
  )
}

const AppPhoneBook = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterText, setFilterText] = useState('')

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
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name : newName,
        number : number
      }
      setPersons(persons.concat(newPerson))
    }
    
  }

  const handleSetFilterText = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} onChange={handleSetFilterText} />

      <h2>add a new</h2>

      <PersonForm updatePerson={handleUpdatePersons} 
      newName={newName}
      setNewName={handleSetNewName}
      number={number}
      setNumber={handleSetNumber} 
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filterText={filterText}/>
      
    </div>
  )
}

// need: 1. form onSubmit and an eventhandler that concats new person to persons
// 2. input attributes should be changed to have value={newName} and onChange={}

export default AppPhoneBook