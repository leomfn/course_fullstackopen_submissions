import personService from "../services/persons"

const PersonEntry = ({ person, persons, setPersons }) => {

  // event handlers
  const handleDeleteButton = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(
          setPersons(persons.filter((p) => p.id !== person.id))
        )
    }

  }
  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDeleteButton}>delete</button>
    </li>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.personsArray.map(person => {
        return (
          <PersonEntry
            person={person}
            persons={props.persons}
            setPersons={props.setPersons}
            key={person.name}
          />
        )
      })}
    </div>
  )
}

export default Persons