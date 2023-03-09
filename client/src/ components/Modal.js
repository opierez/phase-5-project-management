import React from "react";

function Modal({ childComponent }) {
    return (
        // makes sure that the modal appears on top of any other components when it's being shown 
        <div className="modal" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 999 }}> 
            <div className="modal-content">{childComponent}</div>
        </div>
    )
}

export default Modal 