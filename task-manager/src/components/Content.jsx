import React from 'react'
import { useStoreContext } from './StoreContext';


const Content = ({ title, tasks, onTaskDetail }) => {

  const color = title === 'Todo' ? 'red'
    : title === 'Doing' ? 'yellow' : 'green';

  return (
    <div className="column">
      <h4 className="column-title">
        <span className="dot" style={{ backgroundColor: color }}></span>
        {title.toUpperCase()}
        <span className='task-count'>({tasks?.length})</span>
      </h4>

      <div className='task-container'>
        {tasks?.length > 0 ? (
          tasks.map((task) => {

            // const total = task.subtasks?.length || 0;
            // const done = task.subtask?.filter((st) => st.completed).length || 0;

            return (
              <div
                className="task-card"
                key={task.id}
                onClick={() => onTaskDetail(task)}
              >
                <h5>{task.title}</h5>
                {task.subtasks && task.subtasks?.length > 0 ? (
                  <p className='subtask-proress'>
                    {task.subtasks.filter((st) => st.done).length} of {' '}
                    {task.subtasks.length} subtasks done
                  </p>
                ) : (
                  <p className='no-subtasks'>No Subtasks</p>
                )}
              </div>
            )

          })
        ) : (
          <p className="empty-column" >
            No tasks yet
          </p>
        )}
      </div>

    </div>
  );
};

export default Content