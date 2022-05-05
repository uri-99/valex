import { useState } from 'react';
import Modal from './Modal';

function Todo(props) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    function deleteHandler() {
        setModalIsOpen(true);
    }

    function confirmHandler() {
        setModalIsOpen(false);
    }

    return (
        <div>
            <h2>{props.text}</h2>
            <div className='actions'>
                <button className='btn' onClick={deleteHandler}>Delete</button>
            </div>
            {modalIsOpen && <Modal onConfirm={confirmHandler}/>}            
        </div>
        
    );
}

export default Todo;