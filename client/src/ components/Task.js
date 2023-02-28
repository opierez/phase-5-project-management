import React, {useState} from "react";
import {IoEllipsisHorizontal} from 'react-icons/io5'

function Task({ task, showNewTaskModal }) {

    const { description, due_date, id, title, tags} = task 

    const [isEditingTask, setIsEditingTask] = useState(false)

    // state for task options within ellipsis
    const [showOptions, setShowOptions] = useState(false)
   
    // when user clicks on ellipsis, show/hide the task options
    const handleEllipsisClick = () => {
        setShowOptions(!showOptions)
    }

    // when user selects "edit task" option
    const handleEditTaskClick = (task) => {
        showNewTaskModal(task.column_id, task)
        setShowOptions(false)
    }


    return (
        <div className="max-w-sm relative rounded overflow-hidden shadow-lg">
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
                <button className="block w-full text-left">
                    Delete Task
                </button>
                </div>
            ) : null}
            <div style={{ flex: 1 }}></div>
        </div>
    )
}

export default Task 