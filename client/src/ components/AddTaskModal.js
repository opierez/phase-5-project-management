import React, {useState, useEffect} from "react";

function AddTaskModal() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        column_id: null
    })

    const [tags, setTags] = useState([])


    useEffect(() => {
        fetch(`/tags`)
            .then(res => res.json())
            .then(tagData => {
                console.log(tagData)
                setTags(tagData)
            })
    }, [])


    return (
        <div className="overlay">
            <div className="modal-container">
                <h1>Add New Task:</h1>
                <form>
                    
                </form>
            </div>
        </div>
    )
}

export default AddTaskModal 