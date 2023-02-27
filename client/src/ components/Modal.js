import React from "react";

function Modal({ childComponent }) {
    return (
        <div className="modal">
            <div className="modal-content">{childComponent}</div>
        </div>
    )
}

export default Modal 