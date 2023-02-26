import React, {useState, useEffect} from "react";
import Task from "./Task";
import {IoEllipsisHorizontal} from 'react-icons/io5'
import AddTaskModal from "./AddTaskModal";

function Column({ id, columnName, handleUpdatedColumn, ...rest }) {
   
    const [showOptions, setShowOptions] = useState(false)
    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState([])
    const [currentColumnName, setCurrentColumnName] = useState(columnName)
    const [openNewTaskModal, setOpenNewTaskModal] = useState(false)

    useEffect(() => {
        fetch(`/columns/${id}/tasks`)
        .then(res => {
            if (res.ok) {
                res.json().then(taskData => {
                    // console.log(taskData)
                    setTasks(taskData)
                })
            } else {
                res.json().then(data => {
                    // console.log(data)
                    setErrors(data)
                })
            }
        })
    }, [id])

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
        body: JSON.stringify({ name: currentColumnName })
      })
      .then(res => {
        if (res.ok) {
          res.json().then(updatedColumn => {
            handleUpdatedColumn(updatedColumn)
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

    const handleAddTaskClick = () => {
        setOpenNewTaskModal(true)
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
              <button className="block w-full text-left" onClick={handleAddTaskClick}>
                Add Task
              </button>
              <button className="block w-full text-left" onClick={handleDeleteClick}>
                Delete Column
              </button>
            </div>
          ) : null}
          <div style={{ flex: 1 }}>
          {tasks.map(task => (
            // console.log(task)
            <Task key={task.id} task={task} style={{ flex: 1 }}/>
          ))}
          {openNewTaskModal && <AddTaskModal />}
          </div>
        </div>
      )      
}

export default Column 