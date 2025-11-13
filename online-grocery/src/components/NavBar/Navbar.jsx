import React from 'react'
import './NavBar.css'

const Navbar = () => {
  return (
    <div className='header'>
      <div className="header-left">
        <div className='logo'>
          <img src='logo.png' alt="" />
        </div>
        <div className="delivery-location">
          <span className='delivery-duration'>Delivery in 15 minutes</span>
          <span className='delivery-address'>Bole, Adama
            <i class="fa-solid fa-angle-down"></i>
          </span>
        </div>
      </div>
      <div className="searchBar-container">
        <a href="#">
          <i class="fas fa-search"></i>
          <input type="text" />
        </a>
      </div>

      <div className="header-right">
        <button>Login</button>
        <div className="cart">
          <i class="fa-solid fa-cart-shopping"></i>
          <div className='items-price'>
            <span>2 items</span>
            <span>$12</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar