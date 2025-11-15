import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar/SideBar'
import Home from './components/Home/Home'
import AddBookmark from './components/AddBookmark/AddBookmark'
import { TaskProvider, useContextAPI } from './components/ContextAPI'


function App() {

  return (
    <TaskProvider>
      <div className="app">
        <SideBar />
        <Home />
      </div>
    </TaskProvider>
  )
}

export default App
