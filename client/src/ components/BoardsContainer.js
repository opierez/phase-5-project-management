import React, {useEffect, useState} from "react";
import { useHistory, useParams } from 'react-router-dom';
import '../styles/BoardsDashboard.css'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import AddBoardForm from "./AddBoardForm";


function BoardsContainer({ boards, handleUpdateBoards }) {

    const [showForm, setShowForm] = useState(false)
    const { id } = useParams()
    const history = useHistory()
    // console.log(id)

    // when a user selects a board from their board container, redirect them to that project board
    const handleBoardClick = (boardId) => {
        // console.log(boardId)
        history.push(`/users/${id}/boards/${boardId}`)
    }

    // handles show/hide functionality for the add board form 
    const handleShowForm = (boolean) => {
        setShowForm(boolean)
    }

    

    return(
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 style={{ marginRight: '10px' }}>Add Board</h4>
                <button onClick={() => setShowForm(true)} style={{ marginRight: '10px' }}>
                    <span title="Add board">
                        <BsFillPlusCircleFill size={20}/>
                    </span>
                </button>
                {showForm && (
                    <AddBoardForm id={id} handleShowForm={handleShowForm} handleUpdateBoards={handleUpdateBoards}/>
                )}
            </div>
            <div style={{ height: '500px', overflow: 'scroll'}}>
                {boards.map(board => (
                <div key={board.id} className="board-widget" onClick={() => handleBoardClick(board.id)} style={{marginTop: '30px'}}>
                    <h3 className="board-title">{board.title}</h3>
                </div>
                ))}
            </div>
        </div>
    )
}

export default BoardsContainer