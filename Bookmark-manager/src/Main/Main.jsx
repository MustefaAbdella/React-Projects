import React from 'react'
import { Icon } from '@iconify/react'
import './Main.css'
import NavBar from '../components/NavBar/NavBar'

const Main = () => {
  return (
    <div className='main-content'>
      <NavBar />
      <div className="bookmark-grid">
        Grid content
      </div>
    </div>
  )
}

export default Main
