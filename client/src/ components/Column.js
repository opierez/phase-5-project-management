import React, {useState, useEffect} from "react";
import Task from "./Task";
import {IoEllipsisHorizontal} from 'react-icons/io5'

function Column({ id, columnName, ...rest }) {
    // console.log(columnName)
    console.log(id)
    const [showOptions, setShowOptions] = useState(false)
    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`/columns/${id}/tasks`)
        .then(res => {
            if (res.ok) {
                res.json().then(taskData => {
                    console.log(taskData)
                    setTasks(taskData)
                })
            } else {
                res.json().then(data => {
                    console.log(data)
                    setErrors(data)
                })
            }
        })
    }, [id])

    const handleEllipsisClick = () => {
        setShowOptions(!showOptions)
    }

    const handleDeleteClick = () => {

    }

    const handleAddTaskClick = () => {

    }
    

    return (
        <div {...rest} className="w-72 rounded-lg bg-gray-100 shadow-md p-4 flex-shrink-0 flex-grow-0" style={{marginRight: '1rem', position: 'relative'}}>
          <h3 className="font-medium text-lg mb-2">{columnName}</h3>
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
          {tasks.map(task => (
            // console.log(task)
            <Task key={task.id} task={task}/>
          ))}
        </div>
      )      
}

export default Column 