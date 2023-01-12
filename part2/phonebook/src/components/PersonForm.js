const PersonForm = (props) => {
    return (
        <form onSubmit={props.submitHandler}>
            <div>
                name: <input onChange={props.nameInputHandler} value={props.newName} />
            </div>
            <div>
                number: <input onChange={props.numberInputHandler} value={props.newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm