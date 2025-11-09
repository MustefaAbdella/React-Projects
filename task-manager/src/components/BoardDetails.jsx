import React from 'react'
import { useStoreContext } from './StoreContext';
import Content from './Content'

const BoardDetails = () => {

  const { boards, activeBoard, setIsBoardModalOpen, handleTaskDetail } = useStoreContext();

  return (

    <div className="board-columns">
      {boards.length === 0 ? (
        <div className='no-boards'>
          <p>No boards yet. Create your first one to get started.</p>
          <button onClick={() => setIsBoardModalOpen(true)} className='create-board-btn'>
            <i className="fa-solid fa-plus"></i>
            Create New Board
          </button>
        </div>
      )
        : (

          ["Todo", "Doing", "Done"].map((status) => (
            <Content
              key={status}
              title={status}
              tasks={activeBoard?.tasks.filter((t) => t.status === status)}
              onTaskDetail={handleTaskDetail}
            />
          ))

        )
      }
    </div>

  )
}

export default BoardDetails