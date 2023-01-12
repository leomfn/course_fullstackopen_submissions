import { useState } from 'react'

const AddressList = (props) => {
  return (
    <li key={props.name} >
      {props.name}
    </li>
  )
}

const App = () => {
  // state components
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  // event handler functions
  const nameInputHandler = (event) => {
    setNewName(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameInputHandler} value={newName} />
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