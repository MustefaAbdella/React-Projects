import React, { useEffect } from 'react'
import { useStoreContext } from './StoreContext';

const Toast = () => {

  const { toast, setToast } = useStoreContext();

  const message = toast.message;
  const type = toast.type;
  const onClose = () => setToast({ message: "", type: "" });

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto close after 3s
      return () => clearTimeout(timer);
    }
  }, [message], [onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  )
}

export default Toast