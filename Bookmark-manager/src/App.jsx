import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main'
import AddBookmark from './components/AddBookmark/AddBookmark'


function App() {


  return (
    <div className="app">
      <SideBar />
      <Main />
      {/* <AddBookmark /> */}
    </div>
  )
}

export default App
