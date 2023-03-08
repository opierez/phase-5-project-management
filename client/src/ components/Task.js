import React, {Fragment, useState, useEffect, useRef} from "react";
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { useDrag, useDrop } from "react-dnd"
import ITEM_TYPE from "../data/types";

function Task({ task, showNewTaskModal, handleDeletedTask, handleUpdateTasks, columnId }) {

    // drag functionality
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE.TASK,
        item: { id: task.id, columnId: columnId },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }));

      
    // deconstructing the task prop being passed down
    const { description, due_date, id, title, tags} = task 

    // console.log(tags)

    // state for task options within ellipsis
    const [showOptions, setShowOptions] = useState(false)

    // state for any errors returned from fetch request
    const [errors, setErrors] = useState([])

    // keeping track of the task's completed status
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
        // console.log('task value when task is clicked', task.completed)

        let taskCompleteStatus 

        // checks the task's completed status and updates the value to the opposite to adjust for the user selecting or deselecting the check mark icon  
        if (task.completed === false) {
            taskCompleteStatus = true
        } else if (task.completed === true) {
            taskCompleteStatus = false
        }
    
        // updates the is_completed attribute for the task 
        fetch(`/tasks/${task.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({is_completed: taskCompleteStatus})
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedTask => {
                    // console.log('task value after fetch', updatedTask.completed)
                    setIsCompleted(updatedTask.completed) // updates the isCompleted state so that the appropriate check mark color can be rendered based on the updated completed status that was returned
                    handleUpdateTasks(updatedTask) // cb function to update the list of tasks with the new task data 
                })
            } else {
                res.json().then(data => {
                    console.log(data.errors)
                    setErrors(data.errors)
                })
            }
        })
    }

    // if the due date is less than or equal to 2 days, the due date text should be red. if the due date has passed, the due date text should be red and bold 
    const dueDateStyles = () => {
        const msPerDay = 24 * 60 * 60 * 1000; // calcs milliseconds/day (hours in a day * mins in an hour * seconds in a min * ms in a second)
        const daysUntilDue = Math.round((new Date(due_date) - new Date()) / msPerDay); // 
        
        return {
          color: daysUntilDue <= 2 ? 'red' : 'black',
          fontWeight: daysUntilDue <= 0 ? 'bold' : 'normal'
        };
    } 
    

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move',}}>
        <div className="bg-white p-2 rounded-md shadow-md mb-2">
        <div className={`max-w-sm relative rounded overflow-hidden shadow-lg ${isCompleted ? 'opacity-40' : ''}`}>
            <div className="text-green-500 absolute top-0 left-0 mt-2 ml-2">
                <AiOutlineCheckCircle size={20} onClick={() => handleTaskCompleteClick(task)} color={isCompleted ? 'green' : 'black'}/>
            </div>
            <div className="px-6 py-4">
                <strong className="text-base mb-2 font-bold" style={{ paddingLeft: '15px' }}>{title}</strong>
                <details>
                    <summary className="text-gray-700 text-base" style={{ marginTop: '10px' }}>
                        <span>Description:</span>
                    </summary>
                    <p className="text-gray-700 text-base" style={{ marginTop: '10px' }}>{description}</p>
                </details>
                <p style={{ marginTop: '10px', ...dueDateStyles() }}>{new Date(due_date).toLocaleDateString("en-US")}</p>
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
        </div>
        </div>
    )
}

export default Task 