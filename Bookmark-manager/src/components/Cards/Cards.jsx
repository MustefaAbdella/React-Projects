import React from 'react'
import './Cards.css'
import { Icon } from '@iconify/react'
const Cards = () => {
  return (
    <div className='card-container'>
      <div className="card-detail">
        <div className="card-header">
          <div className="card-title">
            <div className='bookmark-icon'><img src="./frontendmentor.svg" alt="" /></div>
            <div className='title-and-link'>
              <h2>Frontend Mentor</h2>
              <a href="#">frontendmentor.io</a>
            </div>
          </div>
          <div className='toggle-menu'>
            <Icon icon='charm:menu-kebab' />
          </div>
        </div>
        <div className="card-content">
          <div className='bookmark-description'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Eius doloribus, nesciunt earum voluptatem ea laborum iure id quod tenetur.
              Eius minus.
            </p>
          </div>
          <div className="bookmark-tags">
            <span>Practice</span>
            <span>Learning</span>
            <span>Community</span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="time-stamp">
          <span className='watches'><Icon icon='mdi:eye-outline' className='watch-icon' /> 30</span>
          <span className='last-watched'><Icon icon='ic:outline-watch-later' /> 19 Oct</span>
          <span className='created-date'><Icon icon='majesticons:calendar-line' /> 23 Nov</span>
        </div>
        <span className='pin'><Icon icon='tabler:pinned' /></span>
      </div>
    </div>
  )
}

export default Cards