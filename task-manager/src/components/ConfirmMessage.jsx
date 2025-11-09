import React from 'react'
import { createPortal } from 'react-dom';
import { useStoreContext } from './StoreContext';

const ConfirmMessage = () => {

  const { confirmOpen, message, confirmDelete, setConfirmOpen } = useStoreContext();

  const onCancel = () => setConfirmOpen(false);

  if (!confirmOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="confirm-modal"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h3 className="confirm-title">Confirm Action</h3>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button className="confirm-btn delete" onClick={confirmDelete}>
            Yes, Delete
          </button>
          <button className="confirm-btn cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmMessage