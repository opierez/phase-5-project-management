import React, {useState, useEffect} from "react";
import '../styles/AddTaskForm.css'


function AddEditTaskForm({ handleCloseTaskModal, handleUpdateTasks, selectedColumnId, selectedTask, resetSelectedTaskStatus }) {


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        column_id: selectedColumnId,
        is_completed: false,
        tags: []
    })

    // state for each tag category (used to render the form's tag options)
    // const [priorityTags, setPriorityTags] = useState([])
    // const [stageTags, setStageTags] = useState([])
    // const [statusTags, setStatusTags] = useState([])

    const priorityTags = [
      {id: 1, name: 'Low Priority', category: 'priority', color: '#9EE2C0', text_color: '#000000'}, 
      {id: 2, name: 'Medium Priority', category: 'priority', color: '#9E1000', text_color: '#000000'},
      {id: 3, name: 'High Priority', category: 'priority', color: '#9E1000', text_color: '#FFFFFF'}
    ]

    const statusTags = [
      {id: 4, name: 'On track', category: 'status', color: '#6EB65F', text_color: '#000000'}, 
      {id: 5, name: 'Off track', category: 'status', color: '#7E1907', text_color: '#FFFFFF'},
    ]

    const stageTags = [
      {id: 6, name: 'Research', category: 'stage', color: '#BAD8FF', text_color: '#000000'}, 
      {id: 7, name: 'Development', category: 'stage', color: '#FFE97D', text_color: '#000000'},
      {id: 8, name: 'Testing', category: 'stage', color: '#FFC4D8', text_color: '#000000'},
      {id: 9, name: 'Implementation', category: 'stage', color: '#4C50A4', text_color: '#FFFFFF'},
    ]


    // state for each tag field
    const [priorityTag, setPriorityTag] = useState("")
    const [stageTag, setStageTag] = useState("")
    const [statusTag, setStatusTag] = useState("")

    // state to check if the user is editing a task so the appropriate path and method can be used in the fetch request
    const [isEditing, setIsEditing] = useState(false)

    // state for any errors returned from fetch request
    const [errors, setErrors] = useState([])

    // if there's a selected task being edited, update the form fields with the task selected task data 
    useEffect(() => {
      if (selectedTask !== null) {
        // console.log(selectedTask)
        setIsEditing(true)
        // maps through the selected task's tags to extract the tag that matches the appropriate category and sets each category state
        const tagNames = selectedTask.tags.map(t => { 
          if (t.category === 'priority') {
            setPriorityTag(t.name) 
          } else if (t.category === 'stage') {
            setStageTag(t.name)
          } else if (t.category === 'status') {
            setStatusTag(t.name)
          }
          return t.name // returns a new array with just the selected task's tag names 
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
    // useEffect(() => {
    //     fetch(`/tags`)
    //         .then(res => res.json())
    //         .then(tagData => {
                // console.log(tagData)
                // set state for each tag category 
                // setPriorityTags(tagData.priority)
                // setStageTags(tagData.stage)
    //             setStatusTags(tagData.status)
    //         })
    // }, [])

    // updates the form with the user's input values 
    const handleInputChange = (e) => {
        const { name, value } = e.target
        // console.log(value)
        // checks if the name is one of the tag categories and if so, updates the form data to include the tag value in the tags array 
        if (name === 'priority-tag') {
          setPriorityTag(value)
          setFormData({ ...formData, tags: [value, stageTag, statusTag] });
        } else if (name === 'status-tag') {
            setStatusTag(value)
            setFormData({ ...formData, tags: [priorityTag, stageTag, value] });
        } else if (name === 'stage-tag') {
            setStageTag(value)
            setFormData({ ...formData, tags: [priorityTag, value, statusTag] });
        // if the name is not one of the tag cateogories, update the form data with the user's inputs
        } else {
            setFormData({ ...formData, [name]: value });
        }
      };
    
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // checks if the task is new or an existing task being edited to send the appropriate path and method in the fetch request
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
            setIsEditing(false)
            setFormData({title: "", description: "", due_date: "", column_id: selectedColumnId, is_completed: false, tags: []}) // reset the form data to its initial state
            handleUpdateTasks(newTask) // cb function to update the tasks state to include the newly created task or edited task
            handleCloseTaskModal(); // cb function to close the new task modal 
          })
        } else {
          res.json().then(data => {
            console.log(data.errors)
            setErrors(data.errors)
          })
        }
      })
    };

    // renders errors for each input field that may return an error 
    const renderError = (field) => {
      return errors.find(error => error.toLowerCase().includes(field)) && (
        <p style={{ color: 'red' }}>{errors.find(error => error.toLowerCase().includes(field))}</p>
      )
    }

    // resets the form data to its initial state if a user cancels editing their task or submits their edits 
    const resetFormData = () => {
      console.log('form successfully reset')
      resetSelectedTaskStatus()
      setFormData({title: "", description: "", due_date: "", column_id: selectedColumnId, is_completed: false, tags: []}) 
    }

    useEffect(() => {
      console.log(formData);
    }, [formData]);
    
    
    return (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Task Details</h3>
              <button className="modal-close" onClick={() => { resetFormData(); handleCloseTaskModal()}}>
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
                  {renderError("title")}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  {renderError("description")}
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
                  {renderError("due date")}
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
                <button type="button" className="form-button" onClick={() => { resetFormData(); handleCloseTaskModal()}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    );
}
    
export default AddEditTaskForm;