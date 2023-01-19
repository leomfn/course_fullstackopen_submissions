import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  // state hookes
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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
      <Notification message={notificationMessage} />
      <Filter inputHandler={filterPhonebookHandler} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        nameInputHandler={nameInputHandler}
        numberInputHandler={numberInputHandler}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
      />
      <h3>Numbers</h3>
      <Persons
        personsArray={personsFiltered}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App