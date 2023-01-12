import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  // state components
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  // event handler functions
  const nameInputHandler = (event) => {
    setNewName(event.target.value)
  }
  const numberInputHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} already exists in phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const filterPhonebookHandler = (event) => {
    setFilterString(event.target.value)
  }

  // other
  const personsFiltered = filterString === ''
    ? [...persons]
    : persons.filter((person) => person.name.toLowerCase().includes(filterString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputHandler={filterPhonebookHandler} />
      <h3>Add a new</h3>
      <PersonForm
        submitHandler={submitHandler}
        nameInputHandler={nameInputHandler}
        numberInputHandler={numberInputHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons personsArray={personsFiltered} />
    </div>
  )
}

export default App