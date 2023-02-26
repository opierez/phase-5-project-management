import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import '../styles/BoardsDashboard.css'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import AddBoardForm from "./AddBoardForm";
import Board from "./Board";


function BoardsContainer({ user }) {

    const [boards, setBoards] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [errors, setErrors] = useState([])
    const { id } = useParams()
    // console.log(id)

    // fetch all boards associated with logged in user
    useEffect(() => {
        fetch(`/users/${user.id}/boards`)
            .then(res => {
                if (res.ok) {
                    res.json().then(userBoards => {
                        setBoards(userBoards)
                    })
                } else {
                    res.json().then(data => {
                        setErrors(data.errors)
                    })
                }
            })
    }, [user])

    // handles show/hide functionality for the add board form 
    const handleShowForm = (boolean) => {
        setShowForm(boolean)
    }

    // handles updating the boards state after an existing board has been edited or a new board has been added
    const handleUpdateBoards = (board) => {
        // console.log(board)
        let updatedBoards
        const existingBoard = boards.find(b => b.id === board.id) // checks boards to find out if the board being passed in is an existing board
        if (existingBoard) {
        // Gather all existing boards and the updated board
        updatedBoards = boards.map(b => {
            if (b.id === board.id) {
            return board
            } 
            return b
        })
        } else {
        // Add new board to the boards list 
        updatedBoards = [...boards, board]
        }
        setBoards(updatedBoards) // updates boards with updated boards data 
    }

    // updates the boards to remove the deleted board 
    const handleDeleteBoard = (boardId) => {
        // console.log(boardId)
        const updatedBoards = boards.filter(b => b.id !== boardId) // creates a new array of all the boards except the one that was deleted
        setBoards(updatedBoards)
    }
    

    return(
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ marginRight: '10px' }}>Add Board</h4>
            <div>
                <button onClick={() => setShowForm(true)} style={{ marginRight: '10px' }}>
                <span title="Add board">
                    <BsFillPlusCircleFill size={20}/>
                </span>
                </button>
            </div>
            {showForm && (
                <AddBoardForm 
                    id={id} 
                    handleShowForm={handleShowForm} 
                    handleUpdateBoards={handleUpdateBoards}/>
            )}
            </div>
            <div style={{ height: '500px', overflow: 'scroll'}}>
            {boards.map(board => (
                <Board 
                    key={board.id} 
                    board={board} 
                    handleUpdateBoards={handleUpdateBoards}
                    handleDeleteBoard={handleDeleteBoard}/>
            ))}
            </div>
        </div>
    )
}

export default BoardsContainer