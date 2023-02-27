import React, {useState, useEffect} from "react";
import '../styles/AddTaskForm.css'


function AddTaskForm({ handleCloseTaskModal, handleAddNewTask, selectedColumnId }) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        column_id: selectedColumnId,
        tags: []
    })

    // state for each tag category (used to render the form's tag options)
    const [priorityTags, setPriorityTags] = useState([])
    const [stageTags, setStageTags] = useState([])
    const [statusTags, setStatusTags] = useState([])


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
        if (name === 'tag') {
          setFormData({...formData, tags: [...formData.tags, value]})
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(formData);

      fetch('/tasks', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })
      .then(res => {
        if (res.ok) {
          res.json().then(newTask => {
            console.log(newTask)
            handleAddNewTask(newTask) // cb function to update the tasks state to include the newly created task 
          })
        }
      })
      handleCloseTaskModal(); // cb function to close the new task modal 
    };
    
    return (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add New Task</h3>
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
                  <select name="tag" value={formData.priority_tag} onChange={handleInputChange}>
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
                  <select name="tag" value={formData.stage_tag} onChange={handleInputChange}>
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
                  <select name="tag" value={formData.status_tag} onChange={handleInputChange}>
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
                <button type="submit" className="form-button">Add Task</button>
                <button type="button" className="form-button" onClick={handleCloseTaskModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    );
}
    
export default AddTaskForm;