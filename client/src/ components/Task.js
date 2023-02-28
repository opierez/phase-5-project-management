import React, {useState, useEffect} from "react";
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {AiOutlineCheckCircle} from 'react-icons/ai'

function Task({ task, showNewTaskModal, handleDeletedTask, handleAddNewTask }) {

    const { description, due_date, id, title, tags} = task 

    // state for task options within ellipsis
    const [showOptions, setShowOptions] = useState(false)

    // state for any errors returned from fetch request
    const [errors, setErrors] = useState([])

    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        if (task.completed) {
            setIsCompleted(true)
        } else if (!task.completed) {
            setIsCompleted(false)
        }
    }, [task])
   
    // when user clicks on ellipsis, show/hide the task options
    const handleEllipsisClick = () => {
        setShowOptions(!showOptions)
    }

    // when user selects "edit task" option
    const handleEditTaskClick = (task) => {
        showNewTaskModal(task.column_id, task) // cb function that will send the task's column id and task that's being edited to parent component 
        setShowOptions(false) // hides the task ellipsis options
    }

    // handle deleting a task when user selects "delete task" option
    const handleDeleteTaskClick = (task) => {
        // console.log(task)
        fetch(`/tasks/${task.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"}
        })
        .then (res => {
            if (res.ok) {
                handleDeletedTask(task.id) // cb function to update the tasks list so the deleted task is removed
            } else {
                res.json().then(data => {
                    console.log(data.errors)
                    setErrors(data.errors) 
                })
            }
        })
    }

    // handle marking the task as complete 
    const handleTaskCompleteClick = (task) => {
        console.log('task value when task is clicked', task.completed)

        let taskCompleteStatus 

        if (task.completed === false) {
            taskCompleteStatus = true
        } else if (task.completed === true) {
            taskCompleteStatus = false
        }
    
        fetch(`/tasks/${task.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({is_completed: taskCompleteStatus})
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedTask => {
                    console.log('task value after fetch', updatedTask.completed)
                    // console.log(updatedTask)
                    setIsCompleted(updatedTask.completed)
                    handleAddNewTask(updatedTask)
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
        <div className="max-w-sm relative rounded overflow-hidden shadow-lg">
            <div className="text-green-500 absolute top-0 left-0 mt-2 ml-2">
                <AiOutlineCheckCircle size={20} onClick={() => handleTaskCompleteClick(task)} color={isCompleted ? 'green' : 'black'}/>
            </div>
            <div className="px-6 py-4">
                <div className="text-base mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
                <p>{due_date}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {tags.map(t => {
                    return (
                        <span key={t.id} style={{backgroundColor: t.color, color:t.text_color}} className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}>{t.name}</span>
                    )
                })}
            </div>
            <button className="absolute top-0 right-0 mt-2 mr-2" onClick={handleEllipsisClick}>
                <IoEllipsisHorizontal size={20} />
            </button>
            {showOptions ? (
                <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded-md">
                <button className="block w-full text-left" onClick={() => handleEditTaskClick(task)}>
                    Edit Task
                </button>
                <button className="block w-full text-left" onClick={() => handleDeleteTaskClick(task)}>
                    Delete Task
                </button>
                </div>
            ) : null}
            <div style={{ flex: 1 }}></div>
        </div>
    )
}

export default Task 