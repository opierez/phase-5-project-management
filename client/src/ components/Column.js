import React, {useState, useEffect, useRef} from "react";
import Task from "./Task";
import {IoEllipsisHorizontal} from 'react-icons/io5'
import { useDrop } from 'react-dnd'
import ITEM_TYPE from "../data/types";

function Column({ 
  id, 
  tasks, 
  columnName, 
  handleUpdatedColumn, 
  showNewTaskModal, 
  handleDeletedTask, 
  handleUpdateTasks, 
  handleDeletedColumn,
  handleUpdateTasksAfterDrop, 
  ...rest 
}) {


    // drop functionality 
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ITEM_TYPE.TASK,
      drop: (item) => {
        console.log('inside usedrop:', tasks)
        const sourceColumnId = item.columnId;
        const destinationColumnId = id;
        console.log(`Task ${item.id} dropped from column ${sourceColumnId} to column ${destinationColumnId}`);
        fetch(`/tasks/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ column_id: id }),
        })
        .then(res => {
          if (res.ok) {
            res.json().then(updatedTask => {
              console.log (updatedTask)
              handleUpdateTasksAfterDrop(updatedTask)
            })
          }
        })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      }),
    }));

    const columnRef = useRef(null);


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

    // handles deleting the column from the board
    const handleDeleteColumnClick = (id) => {
      // console.log(id)
      fetch(`/columns/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
      })
      .then (res => {
          if (res.ok) {
            handleDeletedColumn(id) // cb function to update the columns list so the deleted column is removed
          } else {
              res.json().then(data => {
                  console.log(data.errors)
                  setErrors(data.errors) 
              })
          }
      })
    }

    // when user clicks on "add task" option, show the new task modal and close the column options
    const handleShowNewTaskModal = (id) => {
      // console.log(id)
      showNewTaskModal(id)
      setShowOptions(false)
    }
  
  



  return (
    <div {...rest} 
    ref={columnRef} 
    className="w-72 rounded-lg bg-gray-100 shadow-md p-4 flex-shrink-0 flex-grow-0" style={{
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
          <button className="block w-full text-left" onClick={() => handleDeleteColumnClick(id)}>
            Delete Column
          </button>
        </div>
      ) : null}
      <div 
      ref={drop} 
      style={{ backgroundColor: isOver ? 'lightgray' : 'white', flex: 1 }}
      >
      {tasks
        .filter(task => task.column_id === id) // creates a new array with all of the tasks whose id matches the column id  
        .map(task => ( // map over the filtered array and create a Task card for each task within the array 
            <Task 
              key={task.id} 
              task={task} 
              showNewTaskModal={showNewTaskModal} 
              handleDeletedTask={handleDeletedTask}
              handleUpdateTasks={handleUpdateTasks}
              columnId={id}
              style={{ flex: 1 }} />
 
        ))}
      </div>
    </div>
  )      
}

export default Column 