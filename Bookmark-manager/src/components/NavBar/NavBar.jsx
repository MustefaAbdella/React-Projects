import React from 'react'
import { Icon } from '@iconify/react'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-wrapper">
        <div className="navbar-search">
          <Icon icon='mdi:search' className='search-icon' />
          <input type="text" placeholder='Search by title...' />
        </div>
        <div className="navar-left">
          <button><Icon icon='mdi:plus' /> Add Bookmark</button>
          <div className="profile">
            <img src="../my-channel.jpeg" alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default NavBar
