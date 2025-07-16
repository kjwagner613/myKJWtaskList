import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import SubtaskForm from './SubtaskForm';
import './TaskForm.css';

const TaskForm = (props) => {
  const { taskId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Work',
    notes: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    tags: [],
    attachments: [],
    subtasks: [],

  });

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const taskData = await taskService.show(taskId);
          setFormData(taskData);
          setSubtasks(taskData.subtasks || []);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      fetchTask();
    }
  }, [taskId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (taskId) {
      props.handleUpdateTask(taskId, formData);
    } else {
      props.handleAddTask(formData);
    }
  };

  const [subtasks, setSubtasks] = useState([]);

  const handleAddSubtask = () => {
    const newSubtask = { title: '', description: '', status: 'Pending', dueDate: '' };
    const updatedSubtasks = [...subtasks, newSubtask];
    setSubtasks(updatedSubtasks);
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  const handleChangeSubtask = (index, updatedSubtask) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = updatedSubtask;
    setSubtasks(updatedSubtasks);
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  return (
    <div className="tform-app-container">
      <main>
        <h1 className="taskFormStyle">{taskId ? 'Edit Task' : 'New Task'}</h1>
        <div className="taskFormContainer">
          <form className="taskFormStyle" onSubmit={handleSubmit}>
            <label htmlFor='title-input'>Task Title</label>
            <input
              required
              type='text'
              name='title'
              id='title-input'
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor='text-input'>Task Description</label>
            <textarea
              required
              name='text'
              id='text-input'
              value={formData.text}
              onChange={handleChange}
            />
            <label htmlFor='category-input'>Category</label>
            <select
              required
              name='category'
              id='category-input'
              value={formData.category}
              onChange={handleChange}
            >
              <option value='Home'>Home</option>
              <option value='Work'>Work</option>
              <option value='Hobby'>Hobby</option>
              <option value='Personal'>Personal</option>
              <option value='Medical'>Medical</option>
              <option value='Entertainment'>Entertainment</option>
            </select>
            <label htmlFor='notes-input'>Notes</label>
            <textarea
              required
              name='notes'
              id='notes-input'
              value={formData.notes}
              onChange={handleChange}
            />
            <label htmlFor='dueDate-input'>Due Date</label>
            <input
              type='date'
              name='dueDate'
              id='dueDate-input'
              value={formData.dueDate}
              onChange={handleChange}
            />
            <label htmlFor='priority-input'>Priority</label>
            <select
              required
              name='priority'
              id='priority-input'
              value={formData.priority}
              onChange={handleChange}
            >
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
            <label htmlFor='status-input'>Status</label>
            <select
              required
              name='status'
              id='status-input'
              value={formData.status}
              onChange={handleChange}
            >
              <option value='Pending'>Pending</option>
              <option value='In Progress'>In Progress</option>
              <option value='Completed'>Completed</option>
              <option value='Cancelled'>Cancelled</option>
            </select>
            <label htmlFor='tags-input'>Tags</label>
            <input
              type='text'
              name='tags'
              id='tags-input'
              value={formData.tags}
              onChange={handleChange}
            />
            <label htmlFor='attachments-input'>Attachments</label>
            <input
              type='file'
              name='attachments'
              id='attachments-input'
              multiple
              onChange={handleChange}
            />


           
            {subtasks.map((subtask, index) => (
              <SubtaskForm
                key={index}
                subtask={subtask}
                index={index}
                handleChange={(updated) => handleChangeSubtask(index, updated)}
                handleRemove={() => handleRemoveSubtask(index)}
              />
            ))}
            <div className="buttonContainer">
            <button className="button" type="button" onClick={handleAddSubtask}>
              Add Subtask
            </button>




            <button className="button" type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TaskForm;