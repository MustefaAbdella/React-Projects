import React from 'react'
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { useStoreContext } from './StoreContext'


const AddNewBoard = () => {

  const { newBoardName, setNewBoardName, isBoardModalOpen, setIsBoardModalOpen, handleAddBoard } = useStoreContext();

  const onClose = () => setIsBoardModalOpen(false);
  const onAddBoard = handleAddBoard;

  // const [boardName, setBoardName] = useState('');

  if (!isBoardModalOpen) return null;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    onAddBoard(newBoardName)
    setNewBoardName('')
    onClose();
  };

  return createPortal(
    <div className='modal-overlay'>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h2>Create New Board</h2>
        <form onSubmit={handleSubmit} className='modal-form'>
          <label>Board Name</label>
          <input
            id='newBoardName'
            type="text"
            placeholder='Board Name'
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            className='input'
          />
          <div className='action-btn'>
            <button type='submit' className='create-btn'>Create Board</button>
            <button type='button' onClick={onClose} className='cancel-btn'>Cancel</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default AddNewBoard