import React, {useEffect} from "react";
import { useHistory, useParams } from 'react-router-dom';
import '../styles/BoardsDashboard.css'

function BoardsDashboard({ boards }) {

    const { id } = useParams()
    const history = useHistory()
    // console.log(id)

    const addBoard = () => {

    }

    const handleBoardClick = (boardId) => {
        console.log(boardId)
        history.push(`/users/${id}/boards/${boardId}`)
    }

    return(
        <div>
            <button onClick={addBoard}>Add Board</button>
            <div style={{ height: '500px', overflow: 'scroll' }}>
                {boards.map(board => (
                <div key={board.id} className="board-widget" onClick={() => handleBoardClick(board.id)}>
                    <h3 className="board-title">{board.title}</h3>
                    {/* Add more details for the project widget here */}
                </div>
                ))}
            </div>
        </div>
    )
}

export default BoardsDashboard