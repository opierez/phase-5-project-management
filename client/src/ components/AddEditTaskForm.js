import React, {useState, useEffect} from "react";
import '../styles/AddTaskForm.css'


function AddEditTaskForm({ handleCloseTaskModal, handleAddNewTask, selectedColumnId, selectedTask }) {


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        column_id: selectedColumnId,
        is_completed: false,
        tags: []
    })

    // state for each tag category (used to render the form's tag options)
    const [priorityTags, setPriorityTags] = useState([])
    const [stageTags, setStageTags] = useState([])
    const [statusTags, setStatusTags] = useState([])

    // state for each tag field
    const [priorityTag, setPriorityTag] = useState("")
    const [stageTag, setStageTag] = useState("")
    const [statusTag, setStatusTag] = useState("")

    const [isEditing, setIsEditing] = useState(false)

    // if there's a selected task being edited, update the form fields with the task selected task data 
    useEffect(() => {
      if (selectedTask !== null) {
        // console.log(selectedTask)
        setIsEditing(true)
        const tagNames = selectedTask.tags.map(t => { 
          if (t.category === 'priority') {
            setPriorityTag(t.name) 
          } else if (t.category === 'stage') {
            setStageTag(t.name)
          } else if (t.category === 'status') {
            setStatusTag(t.name)
          }
          return t.name 
        })
        setFormData({
          title: selectedTask.title,
          description: selectedTask.description,
          due_date: selectedTask.due_date,
          column_id: selectedColumnId, 
          is_completed: false,
          tags: tagNames
        })
      } 
    }, [selectedTask])
  

    // fetch all tags from the database and sort by category using state
    useEffect(() => {
        fetch(`/tags`)
            .then(res => res.json())
            .then(tagData => {
                // console.log(tagData)
                // set state for each tag category 
                setPriorityTags(tagData.priority)
                setStageTags(tagData.stage)
                setStatusTags(tagData.status)
            })
    }, [])

    // updates the form with the user's input values 
    const handleInputChange = (e) => {
        const { name, value } = e.target
        console.log(value)
        if (name === 'priority-tag') {
          setPriorityTag(value)
          setFormData({ ...formData, tags: [value, stageTag, statusTag] });
        } else if (name === 'status-tag') {
            setStatusTag(value)
            setFormData({ ...formData, tags: [priorityTag, stageTag, value] });
        } else if (name === 'stage-tag') {
            setStageTag(value)
            setFormData({ ...formData, tags: [priorityTag, value, statusTag] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
      };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);

      const method = isEditing ? "PATCH" : "POST"
      const path = isEditing ? `/tasks/${selectedTask.id}` : '/tasks'
      // debugger

      fetch(path, {
        method: method,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })
      .then(res => {
        if (res.ok) {
          res.json().then(newTask => {
            // console.log(newTask)
            setFormData({title: "", description: "", due_date: "", column_id: selectedColumnId, is_completed: false, tags: []}) // reset the form data to its initial state
            handleAddNewTask(newTask) // cb function to update the tasks state to include the newly created task or edited task
          })
        }
      })
      handleCloseTaskModal(); // cb function to close the new task modal 
    };
    
    return (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Task Details</h3>
              <button className="modal-close" onClick={handleCloseTaskModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="due_date">Due Date:</label>
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Priority Tags:</label>
                  <select name="priority-tag" value={priorityTag} onChange={handleInputChange}>
                    <option>Choose tags...</option>
                    {priorityTags.map((tag) => (
                      <option key={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Stage Tags:</label>
                  <select name="stage-tag" value={stageTag} onChange={handleInputChange}>
                    <option>Choose tags...</option>
                    {stageTags.map((tag) => (
                      <option key={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status Tags:</label>
                  <select name="status-tag" value={statusTag} onChange={handleInputChange}>
                    <option>Choose tags...</option>
                    {statusTags.map((tag) => (
                      <option key={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="form-button">Submit</button>
                <button type="button" className="form-button" onClick={handleCloseTaskModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    );
}
    
export default AddEditTaskForm;