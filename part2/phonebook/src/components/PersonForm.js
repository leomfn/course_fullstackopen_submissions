import personService from "../services/persons"

const PersonForm = ({ persons, nameInputHandler, numberInputHandler, newName, newNumber, setPersons, setNewName, setNewNumber }) => {


    const submitHandler = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {

            const updatePerson = { ...persons.find((p) => p.name === newName), number: newNumber }
            // console.log(updatePerson)
            // alert(`${newName} already exists in phonebook`)
            if (window.confirm(`${updatePerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(updatePerson.id, updatePerson)
                setPersons(persons.map((p => p.id !== updatePerson.id ? p : updatePerson)))
            }
            // console.log(persons.find((p) => p.name === newName).id)
            // console.log(persons.find((p) => p.name === newName))

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

    return (
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
    )
}

export default PersonForm