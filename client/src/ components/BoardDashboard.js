import React, {useEffect, useState, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import Column from "./Column";
import { BsFillPlusCircleFill } from 'react-icons/bs'
import Modal from "./Modal";
import AddEditTaskForm from "./AddEditTaskForm";
import Task from "./Task";

function BoardDashboard() {

    const { board_id } = useParams()

    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedColumnId, setSelectedColumnId] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)

    useEffect(() => {
      // console.log("Tasks updated:", tasks);
    }, [tasks]);

    // fetch all columns associated with current board 
    useEffect(() => {
        fetch(`/boards/${board_id}/columns`)
        .then (res => {
            if (res.ok) {
              res.json().then(columnData => {
                // console.log(columnData)
                setColumns(columnData)
              })
            } else {
              res.json().then(data => {
                // console.log(data)
                setErrors(data)
              })
            }
          })
    }, [board_id])

    // fetch all tasks associated with current board
    useEffect(() => {
      fetch(`/boards/${board_id}/tasks`)
      .then (res => {
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
  }, [board_id])


    // handles adding a new column to the board 
    const handleAddColumnClick = () => {
      
      fetch(`/boards/${board_id}/columns`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: 'Insert Name Here' }) // sets the column name to a default for the user to ultimately update 
      })
      .then(res => {
        if (res.ok) {
          res.json().then(newColumn => {
            setColumns([...columns, newColumn]) // updates the columns list to add the new new column 
          })
        } else {
          res.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
    }

    // updates columns list to include updated/edited column 
    const handleUpdatedColumn = (updatedColumn) => {
      const updatedColumns = columns.map(c => { // creates an updated columns array 
        if (c.id === updatedColumn.id) { // if the column matches the updated column being passed in, return the updated column 
          return updatedColumn
        }
        return c
      })
      setColumns(updatedColumns) // updates column list to include updated/edited column 
    }

    // show the Add New Task modal and set the selectedColumnId to the id of the column where the user clicked add task 
    const showNewTaskModal = (id, task = null) => {
      // console.log(task)
      setSelectedColumnId(id)
      setShowModal(true)
      if (task !== null) {
        setSelectedTask(task)
      }
    }

    // hides the Add New Task modal after a user has submitted their new task or chose to cancel adding a new task
    const handleCloseTaskModal = () => {
      setShowModal(false)
    }

    // when a new task has been added or an existing task updated, update the tasks state with that updates task data 
    const handleUpdateTasks = (task) => {
      let updatedTasks 
      const existingTask = tasks.find(t => t.id === task.id) // checks tasks to find if the task being passed in is an existing task 
      if (existingTask) {
        setSelectedTask(null) // reset the selectedTask state back to null since we've completed editing the task 
        // Gather all existing tasks and the updated task 
        updatedTasks = tasks.map(t => {
          if (t.id === task.id) {
            return task
          }
          return t
        })
      } else {
        // Add the new task
        updatedTasks = [...tasks, task]
      }
      setTasks(updatedTasks) // updates tasks with the updated task data
    }

    // handles updating tasks state after a task has been dragged and dropped to a different column 
    const handleUpdateTasksAfterDrop = (updatedTask) => {
      // console.log('inside handleUpdateTasksAfterDrop, tasks state:', tasks)
      setTasks(tasks => tasks.map(task => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      }));

    }

    // handles removing the deleted task from the tasks state
    const handleDeletedTask = (taskId) => {
      // filter the existing tasks to remove the deleted task and update the tasks state
      const updatedTasks = tasks.filter(t => t.id !== taskId)
      setTasks(updatedTasks)
    }

    // handles removing the deleted column from the columns state
    const handleDeletedColumn = (columnId) => {
      console.log(columnId)
      // filter the existing tasks to remove the deleted task and update the tasks state
      const updatedColumns = columns.filter(c => c.id !== columnId)
      setColumns(updatedColumns)
    }

    // resets the selected task to null if a user cancels editing their selected task
    const resetSelectedTaskStatus = () => {
      setSelectedTask(null)
    }

    

    return (
      <div className="mx-auto max-w-5xl w-full h-full overflow-x-scroll p-4">
        {showModal && <Modal childComponent={
          <AddEditTaskForm 
            handleCloseTaskModal={handleCloseTaskModal} 
            handleUpdateTasks={handleUpdateTasks} 
            selectedColumnId={selectedColumnId}
            selectedTask={selectedTask}
            resetSelectedTaskStatus={resetSelectedTaskStatus}/>
        }/>}
        <div className={columns.length === 0 ? "grid grid-cols-4 gap-4 h-screen" : "flex flex-row justify-between items-start"}>
          {columns.length === 0 ?
            <button className="flex justify-end mt-4">
              <span title="Add column">
                <BsFillPlusCircleFill size={30} onClick={handleAddColumnClick}/>
              </span>
              <span className="ml-2">Add Column</span>
            </button> :
            <>
              {columns.map(column => ( 
                  <Column 
                    key={column.id} 
                    id={column.id} 
                    columnName={column.name} 
                    handleUpdatedColumn={handleUpdatedColumn}
                    showNewTaskModal={showNewTaskModal}
                    tasks={tasks}
                    handleDeletedTask={handleDeletedTask}
                    handleUpdateTasks={handleUpdateTasks}
                    handleDeletedColumn={handleDeletedColumn}
                    handleUpdateTasksAfterDrop={handleUpdateTasksAfterDrop}
                    className="mb-4"
                    />
              ))}
              <button className="mt-4">
                  <span title="Add column">
                      <BsFillPlusCircleFill size={30} onClick={handleAddColumnClick}/>
                  </span>
              </button>
            </>
          }
        </div>
      </div>
    )
}

export default BoardDashboard