function Todo(props) {
    function deleteHandler() {
        alert(props.text);
    }

    return (
        <div>
            <h2>{props.text}</h2>
            <div className='actions'>
                <button className='btn' onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    );
}

export default Todo;