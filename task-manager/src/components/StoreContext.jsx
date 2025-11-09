
import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export const TaskProvider = ({ children }) => {

  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [newBoardName, setNewBoardName] = useState('');


  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editName, setEditName] = useState('');

  const [toast, setToast] = useState({ message: "", type: "success" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);


  // LocalStorage
  useEffect(() => {
    const storedBoards = localStorage.getItem('boards');
    const storeActiveBoard = localStorage.getItem('activeBoard');

    if (storedBoards) {
      const parsedBoards = JSON.parse(storedBoards);
      setBoards(parsedBoards);

      // restore last active board
      if (storeActiveBoard) {
        const found = parsedBoards.find(b => b.id === JSON.parse(storeActiveBoard)?.id);
        setActiveBoard(found || parsedBoards[0] || null);
      }
      else {
        setActiveBoard(parsedBoards[0] || null);
      }
    }
  }, []);

  // save actice boards to localStorage whenever they change
  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem('boards', JSON.stringify(boards));
    }
    else {
      localStorage.removeItem('boards');
    }
  }, [boards])

  // save active board name/id
  useEffect(() => {
    if (activeBoard) {
      localStorage.setItem('activeBoard', JSON.stringify({ id: activeBoard.id }));
      setBoardName(activeBoard.name);
    }
    else {
      localStorage.removeItem('activeBoard');
      setBoardName('');
    }
  }, []);


  useEffect(() => {
    setBoardName(activeBoard?.name || '');
  }, [activeBoard])

  // Create a new board
  const handleAddBoard = (boardName) => {

    const trimmed = boardName.trim();
    if (!trimmed) {
      alert('Board name cannot be empty');
      return;
    }
    const newBoard = { id: Date.now(), name: boardName, tasks: [] };
    setBoards((prev) => [...prev, newBoard]);

    setActiveBoard(newBoard);
    setBoardName(trimmed);
    setNewBoardName('')
    setIsBoardModalOpen(false);
    setToast({ message: "New board created", type: "info" })
  };

  // handle delete board
  const handleDeleteBoard = (boardId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this board?');
    if (!confirmDelete) return;

    setBoards((prevBoards) => {
      const index = prevBoards.findIndex((b) => b.id === boardId);
      const remaining = prevBoards.filter((b) => b.id !== boardId);

      // update activeBoard based on the new remaining list
      setActiveBoard((prevActive) => {
        if (!prevActive) return null;
        if (prevActive.id === boardId) {
          // fallback once the other is deleted
          if (remaining.length === 0) return null;
          if (index > 0) return remaining[index - 1]; // previuos board
          return remaining[0];  // otherwise next one
        }
        return prevActive; // keep unchanged if the active board wasn't deleted
      });

      // Show toast after deletion
      setToast({ message: "Board deleted", type: "info" });

      return remaining;
    });
    setIsBoardModalOpen(false)
  };

  // handle edit board
  const handleEditBoard = (boardId, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) {
      alert('Board name cannot be empty');
      return
    }

    setBoards((prevBoards) => {
      const updated = prevBoards.map((b) => (b.id === boardId ? { ...b, name: trimmed } : b));

      // If the edited board is active, update activeBoard to the updated board object from `updated`
      setActiveBoard((prevActive) => {
        if (!prevActive) return null;
        if (prevActive.id === boardId) {

          // find the updated board object and set it as active
          const updatedBoard = updated.find((b) => b.id === boardId);
          setNewBoardName(updatedBoard.name);
          return updatedBoard;
        }
        return prevActive;
      });
      setToast({ message: "Board renamed", type: "info" });
      return updated;

    });

    // 
    setIsEditOpen(false);
  }

  const openEditModal = (board) => {
    setEditingBoardId(board.id);
    setEditName(board.name);
    setIsEditOpen(true);
  }

  // Add a task to currently selected board
  const handleAddTask = (task) => {
    const updatedBoards = boards.map((board) =>
      board.id === activeBoard.id
        ? { ...board, tasks: [...board.tasks, task] }
        : board
    );
    setBoards(updatedBoards);
    console.log('Updated Boards', updatedBoards);


    const updatedActive = updatedBoards.find(b => b.id === activeBoard.id);
    setActiveBoard(updatedActive);
    console.log('Active Boards Tasks', updatedActive.tasks);

    setToast({ message: "Task added successfully!", type: "success" })
  };

  // handle delete task
  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setConfirmOpen(true);
  }

  const confirmDelete = () => {
    const updatedBoards = boards.map((board) =>
      board.id === activeBoard.id
        ? {
          ...board,
          tasks: board.tasks.filter((task) => task.id !== taskToDelete),
        }
        : board
    );

    setBoards(updatedBoards);
    const updatedActive = updatedBoards.find((b) => b.id === activeBoard.id);
    setActiveBoard(updatedActive);
    setConfirmOpen(false);
    setTaskToDelete(null);

    setToast({ message: "Task deleted successfully", type: "info" });
  };

  // Handle Task details
  const handleTaskDetail = (task) => {
    setSelectedTask(task);
  }

  const closeTaskDetail = () => {
    setSelectedTask(null);
  }

  const handleToggleSubtask = (taskId, subtaskIndex) => {
    const updatedBoards = boards.map((board) => {
      if (board.id !== activeBoard.id) return board;

      const updatedTasks = board.tasks.map((task) => {
        if (task.id !== taskId) return task;

        const updatedSubtasks = task.subtasks.map((st, i) =>
          i === subtaskIndex ? { ...st, done: !st.done } : st
        );

        // Count how many subtasks are done
        const doneCount = updatedSubtasks.filter((st) => st.done).length;
        const totalCount = updatedSubtasks.length;

        // Determine new task status based on progress
        let newStatus = task.status;
        if (doneCount === 0) newStatus = "Todo";
        else if (doneCount < totalCount) newStatus = "Doing";
        else newStatus = "Done";

        return { ...task, subtasks: updatedSubtasks, status: newStatus };
      });

      return { ...board, tasks: updatedTasks };
    });

    setBoards(updatedBoards);
    setActiveBoard(updatedBoards.find((b) => b.id === activeBoard.id));
  };


  const value = {
    // State
    boards,
    activeBoard,
    boardName,
    newBoardName,
    selectedTask,
    toast,
    editingBoardId,
    editName,
    taskToDelete,

    // Modals
    isTaskModalOpen,
    isBoardModalOpen,
    isEditOpen,
    confirmOpen,

    // Setters
    setBoards,
    setActiveBoard,
    setConfirmOpen,
    setBoardName,
    setNewBoardName,
    setSelectedTask,
    setToast,
    setTaskToDelete,
    setIsEditOpen,
    setEditName,
    setEditingBoardId,
    setIsTaskModalOpen,
    setIsBoardModalOpen,

    // Actions
    openEditModal,

    handleEditBoard,
    handleAddTask,
    handleTaskDetail,
    handleDeleteTask,
    handleAddBoard,
    handleDeleteBoard,
    confirmDelete,
    handleToggleSubtask,
    closeTaskDetail,
  };

  return <StoreContext.Provider value={value}>
    {children}
  </StoreContext.Provider>;
};

export const useStoreContext = () => useContext(StoreContext);
