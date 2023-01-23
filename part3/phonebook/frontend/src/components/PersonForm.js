import personService from "../services/persons"

const PersonForm = ({
    persons,
    nameInputHandler, numberInputHandler,
    newName, newNumber,
    setPersons, setNewName, setNewNumber, setNotificationMessage, setErrorMessage
}) => {
    const submitHandler = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {

            const updatePerson = { ...persons.find((p) => p.name === newName), number: newNumber }
            if (window.confirm(`${updatePerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(updatePerson.id, updatePerson)
                    .then(setPersons(persons.map((p => p.id !== updatePerson.id ? p : updatePerson))))
                    .catch(error => {
                        setErrorMessage(`Information of ${newName} has already been removed from server`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPersons(persons.filter(p => p.id !== updatePerson.id))
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            personService
                .create(newPerson)
                .then(
                    returnedEntry => {
                        setPersons(persons.concat(returnedEntry))
                        setNotificationMessage(
                            `Added ${newName}`
                        )
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000)
                    })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
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