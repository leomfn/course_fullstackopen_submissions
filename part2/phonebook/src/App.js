import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  // state hookes
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  // event hooks
  useEffect(() => {
    personService
      .getAll()
      .then(phoneBookData => setPersons(phoneBookData))
  },
    []
  )

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
      personService
        .create(newPerson)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))
        })
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