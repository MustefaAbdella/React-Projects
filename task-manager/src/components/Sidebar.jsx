import React, { useState, useEffect, useRef } from 'react'
import '../App.css';
import { useStoreContext } from './StoreContext';
const Sidebar = () => {

  const { boards, activeBoard, setActiveBoard, setIsBoardModalOpen, handleDeleteBoard, openEditModal, handleEditBoard } = useStoreContext();

  const openAddBoardModal = () => setIsBoardModalOpen(true);

  const [menuOpenId, setMenuOpenId] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (boardId, e) => {
    e.stopPropagation();  // prevent triggering setActiveBoard
    setMenuOpenId(menuOpenId === boardId ? null : boardId);
  }

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <aside className="sidebar">
      <span className="logo">
        <img src="src/assets/futureDev-logo.png" alt="logo" />
      </span>
      <h2 className='all-boards'>ALL BOARDS ({boards.length})</h2>
      <ul className="menu">
        {boards.map((board) => (
          <li
            key={board.id}
            className={`board-item ${activeBoard.name === board.name ? 'active' : ''}`}
            onClick={() => setActiveBoard(board)}
          >
            <i className="fa-solid fa-table-columns"></i>
            <span className='board-name'>{board.name}</span>

            <i className="fa-solid fa-ellipsis-vertical menu-toggle"
              onClick={(e) => toggleMenu(board.id, e)}>
            </i>
            <div className="toggle" ref={menuRef}>
              {menuOpenId === board.id && (
                <div className='board-menu' onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => openEditModal(board)}>Edit Board</button>
                  <button className='delete' onClick={() => handleDeleteBoard(board.id)}>Delete Board</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <span className="create-board-btn" onClick={openAddBoardModal}>
        <i className="fa-solid fa-plus"></i>
        Create New Board
      </span>
    </aside>
  )
}

export default Sidebar