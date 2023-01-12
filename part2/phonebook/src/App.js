import { useState } from 'react'

const AddressList = (props) => {
  return (
    <li key={props.name} >
      {props.name} {props.number}
    </li>
  )
}

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
      <div>
        filter shown with <input onChange={filterPhonebookHandler} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameInputHandler} value={newName} />
        </div>
        <div>
          number: <input onChange={numberInputHandler} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsFiltered.map(person => AddressList(person))}
      </div>
    </div>
  )
}

export default App