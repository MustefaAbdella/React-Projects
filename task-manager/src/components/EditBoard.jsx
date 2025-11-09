import React, { useEffect } from 'react'
import { useStoreContext } from './StoreContext';
import EditBoardModal from './EditBoardModal';

const EditBoard = () => {

  const { isEditOpen, setIsEditOpen } = useStoreContext();

  const onClose = () => setIsEditOpen(false)

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);


  return (isEditOpen &&
    <EditBoardModal />
  )
}

export default EditBoard