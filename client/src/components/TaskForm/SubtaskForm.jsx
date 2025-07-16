import './TaskForm.css';

const SubtaskForm = ({ subtask, handleChange, handleRemove }) => {
  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    handleChange({ ...subtask, [name]: value });
  };

  return (
    <div>
      <div className="taskFormContainer2">
        <h5>Subtask</h5>
        <div className="taskFormStyle2">
          <label>Title</label>
          <input type="text" name="title" value={subtask.title} onChange={handleFieldChange} />
          <label>Description</label>
          <textarea name="description" value={subtask.description} onChange={handleFieldChange} />
          <label>Due Date</label>
          <input type="date" name="dueDate" value={subtask.dueDate} onChange={handleFieldChange} />
          <label>Status</label>
          <select name="status" value={subtask.status} onChange={handleFieldChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      <div className="buttonContainer2">
      <button type="button" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default SubtaskForm;