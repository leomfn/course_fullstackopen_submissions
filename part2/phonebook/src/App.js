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
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => AddressList(person))}
      </div>
    </div>
  )
}

export default App