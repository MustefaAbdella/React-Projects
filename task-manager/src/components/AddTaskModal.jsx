
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useStoreContext } from './StoreContext';


const AddTaskModal = () => {

  const { isTaskModalOpen, setIsTaskModalOpen, handleAddTask } = useStoreContext();

  const onClose = () => setIsTaskModalOpen(false);
  const onAddTask = handleAddTask;


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [subtasks, setSubtasks] = useState([{ id: Date.now(), title: '', completed: false }]);

  if (!isTaskModalOpen) return null

  // add empty subtask field
  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now(), title: '', completed: false }])
  }

  // remove subtask
  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((st) => st.id !== id));
  }

  // update subtask's title
  const handleSubataskChange = (id, value) => {
    const updated = subtasks.map((st) =>
      st.id === id ? { ...st, title: value }
        : st
    );
    setSubtasks(updated);
  }


  // Form submit handler
  const handleSubmit = (e) => {

    e.preventDefault();

    const cleanedSubtasks = subtasks
      .filter((st) => st.title.trim() !== '')
      .map((st) => ({ ...st, id: Date.now + Math.random(), completed: false }));

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      subtasks: cleanedSubtasks,
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setStatus('Todo');
    setSubtasks([{ id: Date.now(), title: '', completed: false }])
    onClose();
    console.log('New Task: ', newTask);
  }

  return createPortal(
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Add New Task</h2>

        <form className='modal-form' onSubmit={handleSubmit}>
          <label htmlFor="title">Task title</label>
          <input
            type="text"
            placeholder='Task title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            placeholder='Task description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="subtask-1">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div key={subtask.id} className='subtask-field'>
              <input
                type="text"
                placeholder={`Subtask ${index + 1}`}
                value={subtask.title}
                onChange={(e) => handleSubataskChange(subtask.id, e.target.value)}
              />
              {subtasks.length > 1 && (
                <button
                  type='button'
                  className='remove-subtask-btn'
                  onClick={() => handleRemoveSubtask(subtask.id)}
                >
                  X
                </button>
              )}
            </div>
          ))}

          <button
            type='button'
            className='add-subtask-btn'
            onClick={handleAddSubtask}
          >
            + Add New Subtask
          </button>

          <label htmlFor="status">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <div className='action-btn'>
            <button type='submit' className='create-btn' disabled={!title.trim()} >
              Create New Task
            </button>
            <button type='button' onClick={onClose} className='cancel-btn' >
              Cancel
            </button>
          </div>

        </form>



      </div>
    </div>,
    document.body
  )
}

export default AddTaskModal
