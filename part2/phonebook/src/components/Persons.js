const AddressList = (props) => {
    return (
      <li key={props.name} >
        {props.name} {props.number}
      </li>
    )
  }

const Persons = (props) => {
    return (
        <div>
            {props.personsArray.map(person => AddressList(person))}
        </div>
    )
}

export default Persons