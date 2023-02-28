import React, {useState, useEffect} from "react";
import Task from "./Task";
import {IoEllipsisHorizontal} from 'react-icons/io5'


function Column({ id, tasks, columnName, handleUpdatedColumn, showNewTaskModal, handleDeletedTask, ...rest }) {

    const [showOptions, setShowOptions] = useState(false)
    const [errors, setErrors] = useState([])

    // holds the user's column name change input 
    const [currentColumnName, setCurrentColumnName] = useState(columnName)

    // hides/shows column options 
    const handleEllipsisClick = () => {
        setShowOptions(!showOptions)
    }

    // grabs the user's column name change input
    const handleColumnNameChange = (e) => {
      setCurrentColumnName(e.target.value)
    }

    // when the user clicks out of the title, send a fetch to update the column name 
    const handleColumnNameBlur = () => {
      // console.log('new column name:', currentColumnName)

      fetch(`/columns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ name: currentColumnName }) // sends updated column name 
      })
      .then(res => {
        if (res.ok) {
          res.json().then(updatedColumn => {
            handleUpdatedColumn(updatedColumn) // cb function to update columns list to include updated/edited column 
          })
        } else {
          res.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
      
    }

    const handleDeleteClick = () => {

    }

    // when user clicks on "add task" option, show the new task modal and close the column options
    const handleShowNewTaskModal = (id) => {
      // console.log(id)
      showNewTaskModal(id)
      setShowOptions(false)
    }


  return (
    <div {...rest} className="w-72 rounded-lg bg-gray-100 shadow-md p-4 flex-shrink-0 flex-grow-0" style={{
        marginRight: "1rem",
        position: "relative",
        height: "580px", 
        overflowY: "auto", 
        display: "flex", 
        flexDirection: "column", 
      }}>
        <input 
          type="text"
          className="font-medium text-lg mb-2"
          value={currentColumnName}
          onChange={handleColumnNameChange}
          onBlur={handleColumnNameBlur}
          style={{
            border: 'none',
            outline: 'none',
            background: 'none',
            fontWeight: 'bold',
            width: '100%',
          }}
        />
      {/* <h3 className="font-medium text-lg mb-2">{columnName}</h3> */}
      <button className="absolute top-0 right-0 mt-2 mr-2" onClick={handleEllipsisClick}>
        <IoEllipsisHorizontal size={20} />
      </button>
      {showOptions ? (
        <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded-md">
          <button className="block w-full text-left" onClick={() => handleShowNewTaskModal(id)}>
            Add Task
          </button>
          <button className="block w-full text-left" onClick={handleDeleteClick}>
            Delete Column
          </button>
        </div>
      ) : null}
      <div style={{ flex: 1 }}>
      {tasks
        .filter(task => task.column_id === id) // creates a new array with all of the tasks whose id matches the column id  
        .map(task => ( // map over the filtered array and create a Task card for each task within the array 
          <Task 
            key={task.id} 
            task={task} 
            showNewTaskModal={showNewTaskModal} 
            handleDeletedTask={handleDeletedTask}
            style={{ flex: 1 }} />
        ))
      }
      </div>
    </div>
  )      
}

export default Column 