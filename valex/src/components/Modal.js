function Modal(props){

    function onConfirm(){
        props.onConfirm();
    }
    return(
        <div>
            <p>Are you sure?</p>
            <button className="btn" onClick={props.onCancel}>cancel</button>
            <button className="btn" onClick={onConfirm}>confirm</button>
        </div>
    );
}

export default Modal;