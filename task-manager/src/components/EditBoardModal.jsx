import React from 'react'
import { useStoreContext } from './StoreContext';
import { createPortal } from 'react-dom';

const EditBoardModal = () => {


  const { editName, editingBoardId, setEditName, setIsEditOpen, handleEditBoard } = useStoreContext();

  const name = editName;
  const setName = setEditName;
  const onClose = () => setIsEditOpen(false);
  const onSave = () => handleEditBoard(editingBoardId, editName);

  return createPortal(
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h2>Edit Board Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter new board name'
        />
        <div className='action-btn'>
          <button className='board-rename-btn' onClick={onSave}>Save</button>
          <button className='cancel-rename-btn' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EditBoardModal