import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import AddTaskModal from './components/AddTaskModal';
import NavBar from './components/NavBar';
import AddNewBoard from './components/AddNewBoard';
import Toast from './components/Toast';
import TaskDetail from './components/TaskDetail';
import ConfirmMessage from './components/ConfirmMessage';
import EditBoard from './components/EditBoard';
import BoardDetails from './components/BoardDetails';
import { TaskProvider } from './components/StoreContext';

function App() {


  return (
    <TaskProvider>
      <div className="app-container">
        <Sidebar />

        <div className="content-column">
          <NavBar />

          <BoardDetails />
        </div>

        <AddNewBoard />

        <EditBoard />

        <AddTaskModal />

        <TaskDetail />

        <ConfirmMessage />

        <Toast />
      </div>
    </TaskProvider>
  );
}

export default App
