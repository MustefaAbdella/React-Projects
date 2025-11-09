import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useStoreContext } from './StoreContext';


const TaskModal = () => {

  const { selectedTask, closeTaskDetail, handleToggleSubtask, handleDeleteTask } = useStoreContext();

  const task = selectedTask;
  const onClose = closeTaskDetail;
  const onDeleteTask = handleDeleteTask;
  const onToggleSubtask = handleToggleSubtask;

  if (!task) return null;

  return createPortal(
    <div className='modal-overlay'>
      <div
        className='task-detail'
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        <div className='task-header'>
          <h2>{task.title}</h2>
          <button onClick={onClose} className='close-btn'>
            X
          </button>
        </div>

        {task.description && (
          <p className='task-desc'>{task.description}</p>
        )}

        {task.subtasks?.length > 0 && (
          <div className='subtask-section'>
            <h3>
              Subtasks
              ({task.subtasks.filter(st => st.done).length} of {task.subtasks.length})
            </h3>
            <ul className='subtask-list'>
              {task.subtasks.map((subtask, index) => (
                <li
                  key={index}
                  className={`subtask-item ${subtask.done ? 'done' : ''}`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={subtask.done}
                      onChange={() => onToggleSubtask(task.id, index)}
                    />
                    {subtask.title}
                  </label>
                </li>
              ))}
            </ul>
          </div >
        )}

        <div className='task-footer' >
          <button className='delete-task-btn' onClick={() => onDeleteTask(task.id)}>
            Delete Task
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default TaskModal