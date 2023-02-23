import React from "react";

function Modal() {

    const toggleModal = () => {
        
    }

    return (
        <div className="modal">
            <div className="overlay">
                <button className="close-modal" onClick={toggleModal}>Close</button>
            </div>
        </div>
    )
}

export default Modal 