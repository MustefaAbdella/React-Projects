import { useState } from 'react'
import { useStoreContext } from './StoreContext'


const NavBar = () => {

  const { boardName, setIsTaskModalOpen } = useStoreContext();

  const openAddTaskModal = () => setIsTaskModalOpen(true);
  return (
    <nav className="nav-container">
      <h3>{boardName}</h3>
      <div>
        <button onClick={openAddTaskModal} className="add-task-btn">
          <i className="fa-solid fa-plus"></i>Add New Task
        </button>
        <i className="fa-solid fa-ellipsis-vertical" aria-label="Options menu"></i>
      </div>
    </nav>
  )
}

export default NavBar