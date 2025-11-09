import React, { useEffect } from 'react'
import { useStoreContext } from './StoreContext';
import TaskModal from './TaskModal';


const TaskDetail = () => {

  const { selectedTask, closeTaskDetail, } = useStoreContext();


  const task = selectedTask;
  const onClose = closeTaskDetail;

  // close modal
  useEffect(() => {

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!task) return null;

  return (task &&
    <TaskModal />
  )
};

export default TaskDetail