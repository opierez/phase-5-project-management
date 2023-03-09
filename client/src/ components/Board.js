import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import '../styles/Board.css'

function Board({ board, handleUpdateBoards, handleDeleteBoard, updateFavoritesBar }) {

    // state for hiding/showing Board options 
    const [showOptions, setShowOptions] = useState(false)
    const [errors, setErrors] = useState([])

    // state for keeping track of edits to board title 
    const [currentBoardTitle, setCurrentBoardTitle] = useState(board.title)

    const history = useHistory()
    const { id } = useParams()

    // when a user selects a board from their board container, redirect them to that project board
    const handleBoardClick = (boardId, e) => {
        // console.log(boardId)
        if (e.target.tagName !== "INPUT") { // only redirect if the user is not editing their board title 
            history.push(`/boards/${boardId}`)
        }
    }

    // when user clicks on ellipsis, present delete option 
    const handleEllipsisClick = () => {
        setShowOptions(!showOptions)
    }

    // grabs the user's board title change input
    const handleBoardTitleChange = (e) => {
        setCurrentBoardTitle(e.target.value)
    }

    // handles updating board title with user's input 
    const handleBoardTitleBlur = () => {
        console.log('new board title:', currentBoardTitle)

        fetch(`/boards/${board.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: currentBoardTitle})
        })
        .then (res => {
            if (res.ok) {
                res.json().then(updatedBoards => {
                    console.log(updatedBoards)
                    handleUpdateBoards(updatedBoards) // cb function to update the list of boards to include the updated board 
                })
            } else {
                res.json().then(data => {
                    // console.log(data)
                    setErrors(data.errors) 
                })
            }
        })
    }

    // handles deleting selected board from database
    const handleDeleteBoardClick = () => {
        // console.log(board.id)
        setShowOptions(false) // hide board options after user clicks "delete board"

        fetch(`/boards/${board.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                handleDeleteBoard(board.id) // cb function to remove the deleted board from the boards state/list
            } else {
                res.json().then(data => {
                    setErrors(data.errors)
                })
            }
        })
    }

    // handle marking the board as favorite 
    const handleFavoriteClick = (boardId) => {
        // console.log(boardId)

        let newFavoriteStatus

        // checks the board's favorite status and updates the value to the opposite to adjust for the user selecting or deselecting the star icon
        if (board.is_favorite === false) {
            newFavoriteStatus = true
        } else if (board.is_favorite === true) {
            newFavoriteStatus = false
        }

        // updates the is_favorite attribute for the board
        fetch(`/boards/${board.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({is_favorite: newFavoriteStatus})
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedFavBoards => {
                    // console.log(updatedFavBoards)
                    handleUpdateBoards(updatedFavBoards) // cb function to update the boards list with the updated favorited boards
                    updateFavoritesBar(updatedFavBoards) // cb function to update the favorites bar with the updated favorited boards
                })
            } else {
                res.json().then(data => {
                    console.log(data.errors)
                    setErrors(data.errors)
                })
            }
        })
    }


    return (
        <div key={board.id} className="board-widget" onClick={(e) => handleBoardClick(board.id, e)} style={{marginTop: '30px', position: 'relative', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div onClick={(e) => { e.stopPropagation(); handleFavoriteClick(board.id) }} >
                        {/* if the board is marked as a favorite, the star icon will be gold. otherwise, it will be outlined black with no color fill. */}
                        {board.is_favorite ? (
                            <AiFillStar style={{ color: '#FFDF01' }} />
                        ) : (
                            <AiOutlineStar style={{ color: 'black' }} />
                        )}
                    </div> 
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input 
                            type="text"
                            className="font-medium text-lg mb-2"
                            value={currentBoardTitle}
                            onChange={(e) => handleBoardTitleChange(e)} 
                            onBlur={() => handleBoardTitleBlur()}
                            style={{ border: 'none', outline: 'none', background: 'none', fontWeight: 'bold', width: '100%'}}
                        />
                    </div> 
                </div>
                <button>
                    {/* e.stopPropagation() stops the onClick event from the parent element from running and allows react icon to have it's own onClick event */}
                    <IoEllipsisHorizontal size={20} style={{position: 'absolute', top: '10', right: '10'}} onClick={(e) => { e.stopPropagation(); handleEllipsisClick(); }} /> 
                </button>
            </div>
            {showOptions && (
                <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded-md">
                        <button className="block w-full text-left" onClick={(e) => { e.stopPropagation(); handleDeleteBoardClick(); }}>
                            Delete Board
                        </button>
                </div>
            )}
        </div>
    )
}

export default Board