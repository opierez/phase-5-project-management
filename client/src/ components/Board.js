import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'

function Board({ board, handleUpdateBoards, handleDeleteBoard }) {

    // state for hiding/showing Board options 
    const [showOptions, setShowOptions] = useState(false)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [newTitle, setNewTitle] = useState(board.title)
    const [errors, setErrors] = useState([])

    const history = useHistory()
    const { id } = useParams()

    // when a user selects a board from their board container, redirect them to that project board
    const handleBoardClick = (boardId) => {
        // console.log(boardId)
        if (!isEditingTitle) { // only redirect if the user is not editing their board title 
            history.push(`/users/${id}/boards/${boardId}`)
        }
    }

    // when user clicks on ellipsis, present delete option 
    const handleEllipsisClick = () => {
        setShowOptions(!showOptions)
    }

    // when user clicks on "Edit Board Title" button, update the state of editing title to true 
    const handleEditTitleClick = () => {
        setIsEditingTitle(true)
        setShowOptions(false)
    }

    // when user saves their edited title, update on backend
    const handleSaveClick = () => {
        const newBoardTitle = {
            title: newTitle
        }

        console.log(newBoardTitle)
        fetch(`/boards/${board.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBoardTitle)
        })
        .then (res => {
            if (res.ok) {
                res.json().then(updatedBoard => {
                    // console.log(updatedBoard)
                    handleUpdateBoards(updatedBoard) // cb function to update the list of boards with the 
                })
            } else {
                res.json().then(data => {
                    // console.log(data)
                    setErrors(data.errors) 
                })
            }
        })

        setIsEditingTitle(false) // reset editing title state after user's edit title submission has completed 
    }

    // when user cancels editing their title, reset the title to the original board title, reset editing title state since user is no longer editing 
    const handleCancelClick = () => {
        setNewTitle(board.title)
        setIsEditingTitle(false)
    }

    // handles user's input for the new board title 
    const handleTitleEdit = (e) => {
        setNewTitle(e.target.value)
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
        console.log(boardId)

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
                res.json().then(updatedBoard => {
                    // console.log(updatedBoard)
                    handleUpdateBoards(updatedBoard)
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
        <div key={board.id} className="board-widget" onClick={() => handleBoardClick(board.id)} style={{marginTop: '30px', position: 'relative'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {isEditingTitle ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                        <input type="text" value={newTitle} onChange={handleTitleEdit} style={{ marginRight: '10px' }} />
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={handleSaveClick} style={{ marginRight: '10px' }}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div onClick={(e) => { e.stopPropagation(); handleFavoriteClick(board.id) }} style={{ cursor: 'pointer' }}>
                                {/* if the board is marked as a favorite, the star icon will be gold. otherwise, it will be outlined black with no color fill. */}
                                {board.is_favorite ? (
                                    <AiFillStar style={{ color: '#FFDF01' }} />
                                ) : (
                                    <AiOutlineStar style={{ color: 'black' }} />
                                )}
                            </div>
                            <h3 className="board-title" style={{ marginTop: '5px' }}>{board.title}</h3>
                        </div>
                        {/* e.stopPropagation() stops the onClick event from the parent element from running and allows react icon to have it's own onClick event */}
                        <IoEllipsisHorizontal size={20} style={{position: 'absolute', top: '10', right: '10'}} onClick={(e) => { e.stopPropagation(); handleEllipsisClick(); }} /> 
                    </div>
                )}
            </div>
            {showOptions && (
                <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded-md">
                    {isEditingTitle ? null : (
                        <button className="block w-full text-left" onClick={(e) => { e.stopPropagation(); handleEditTitleClick(); }}> 
                            Edit Board Title
                        </button>
                    )}
                        <button className="block w-full text-left" onClick={(e) => { e.stopPropagation(); handleDeleteBoardClick(); }}>
                            Delete Board
                        </button>
                </div>
            )}
        </div>
    )
}

export default Board