import React from 'react'
import './AddBookmark.css'
import { createPortal } from 'react-dom'

const AddBookmark = () => {
  return createPortal(
    <div className="modal-overlay">
      <div className='add-bookmark'>
        <h2>Add a new bookmark</h2>
        <form className='bookmark-form'>
          <input type="text" placeholder='Title' />
          <input type="text" placeholder='URL' />
          <textarea placeholder='Description'></textarea>
          <input type="text" placeholder='Tags' />

          <div className="form-controls">
            <span className='cancel-btn'>Cancel</span>
            <button className='save-btn'>Save bookmark</button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  )
}

export default AddBookmark