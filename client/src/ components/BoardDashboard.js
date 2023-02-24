import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Column from "./Column";
import { BsFillPlusCircleFill } from 'react-icons/bs'

function BoardDashboard() {

    const { board_id } = useParams()

    const [columns, setColumns] = useState([])
    // const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`/boards/${board_id}/columns`)
        .then (res => {
            if (res.ok) {
              res.json().then(columnData => {
                console.log(columnData)
                setColumns(columnData)
                // setTasks(columnData.tasks)
              })
            } else {
              res.json().then(data => {
                // console.log(data)
                setErrors(data)
              })
            }
          })
    }, [])

    return (
        <div className="mx-auto max-w-5xl w-full h-full flex flex-row overflow-x-scroll p-4 relative">
            {columns.map(column => ( 
                <Column 
                key={column.id} 
                id={column.id} 
                columnName={column.name} 
                // tasks={column.tasks} 
                className="mb-4" />
            ))}
            <button className="absolute top-0 right-0 mt-4 mr-4">
                <span title="Add column">
                    <BsFillPlusCircleFill size={30}/>
                </span>
            </button>
        </div>
    )
}

export default BoardDashboard