const Notification = ({ message, type }) => {
    const notificationStyle = {
        fontSize: '20px',
        color: type === 'notification' ? 'green' : 'red',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
        return null
    } else {
        return (
            <div style={notificationStyle}>
                {message}
            </div>
        )

    }
}

export default Notification