import React, {useState} from "react";
import '../styles/AddBoardForm.css'

function AddBoardForm({ id, handleShowForm, handleUpdateBoards }) {
    // console.log(id)

    const [boardForm, setBoardForm] = useState({
        title: ""
    })
    const [errors, setErrors] = useState([])

    // updates the boardForm with the user's input
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value 

        setBoardForm({...boardForm, [name]: value})
    }

    // handles the form submission and creates a new board 
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(boardForm)

        fetch(`/users/${id}/boards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boardForm)
        }) 
        .then(res => {
            if (res.ok) {
                res.json().then((newBoard) => {
                    // console.log(newBoard)
                    handleUpdateBoards(newBoard) // updates the boards list to include the new board
                })
            } else {
                res.json().then(data => {
                    setErrors(data.errors)
                })
            }
        })

        handleShowForm(false) // hides add board form after submission
        setBoardForm({ title: ""}) // resets the form data 
        
    }

    // hides the add board form if the user cancels their submission 
    const handleCancel = () => {
        handleShowForm(false)
    }

    return (
        <form className="form-container">
            <label htmlFor="title">Board Title:</label>
            <input
            type="text"
            name="title"
            className="form-control"
            value={boardForm.title}
            onChange={handleChange}
            />
            <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
            <button type="cancel" className="btn" onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default AddBoardForm