import React from 'react'
import { Icon } from '@iconify/react'
import './Main.css'
import NavBar from '../NavBar/NavBar'
import Cards from '../Cards/Cards'

const Main = () => {
  return (
    <div className='main-content'>
      <NavBar />
      <div className="grid-container">
        <div className="header-container">
          <div className="header">
            <h1>All bookmarks</h1>
            <button><Icon icon='mdi:sort' />Sort by</button>
          </div>
        </div>
        <div className="bookmark-cards">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
    </div>
  )
}

export default Main
