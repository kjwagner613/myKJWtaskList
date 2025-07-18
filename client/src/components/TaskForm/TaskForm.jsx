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
    const { name, value, type, files } = evt.target;
    if (name === 'tags') {
      setFormData({ ...formData, tags: value.split(',').map(tag => tag.trim()).filter(tag => tag) });
    } else if (name === 'attachments') {
      setFormData({ ...formData, attachments: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    <main>
      <section className="newGrid">

        <h1 className="">{taskId ? 'Edit Task' : 'New Task'}</h1>
        {/* <div className="taskGridWrap"> */}
        <div className=""></div>
        <form className="gridShell" onSubmit={handleSubmit}>
          <div className="fieldGroupWarap">
            <div className="fieldShell">
              <label htmlFor='title-input'>Task Title</label>
              <input
                required
                type='text'
                name='title'
                id='title-input'
                value={formData.title}
                onChange={handleChange}
              /></div>
            <div className="fieldShell">
              <label htmlFor='text-input'>Task Description</label>
              <textarea
                required
                name='text'
                id='text-input'
                value={formData.text}
                onChange={handleChange}
              />
            </div>

            <div className="fieldShell">
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
            </div>
          </div>
          <div className="fieldGroupWrap">
            <div className="fieldShell">
              <label htmlFor='dueDate-input'>Due Date</label>
              <input
                type='date'
                name='dueDate'
                id='dueDate-input'
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
            <div className="fieldShell">
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
              </select></div>
            <div className="fieldShell">
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
                <option value='On Hold'>On Hold</option>
              </select>
            </div>
            <div className="fieldShell">
              <label htmlFor='tags-input'>Tags</label>
              <input
                type='text'
                name='tags'
                id='tags-input'
                value={formData.tags.join(', ')}
                onChange={handleChange}
                placeholder="Comma separated tags"
              />
            </div>
          </div>
          <div className="gridShell">
            <h2>Attachments</h2>

            <div className="callout">
              📎 <strong>Note:</strong> You can upload multiple files at once. Max size per file is <em>5MB</em>.
              Supported formats include PDFs, images, and text documents.
            </div>

            <input
              type="file"
              name="attachments"
              id="attachments-input"
              multiple
              onChange={handleChange}
            />
          </div>

          <section className="gridShell">
            <h2 className="fs-base text-accent">Subtasks</h2>

            {subtasks.map((subtask, index) => (
              <SubtaskForm
                key={index}
                subtask={subtask}
                index={index}
                handleChange={(updated) => handleChangeSubtask(index, updated)}
                handleRemove={() => handleRemoveSubtask(index)}
              />
            ))}

            <div className="fieldsubTaskFieldGroupWrap">
              <div className="subTaskFieldShell">
                <button className="btn btn-sm" type="button" onClick={handleAddSubtask}>
                  Add Subtask
                </button>
              </div>
              <div className="subTaskFieldShell">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </section>


        </form>


      </section>
    </main>
  );
};

export default TaskForm;