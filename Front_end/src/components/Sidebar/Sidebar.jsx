import React from 'react'
import './Sidebar.css'

const Admin = () => {
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="">Orders</a>
          </li>
        <li className='sidebar-list-item'>
          <a href="/products">Products</a>
          </li>
        <li className='sidebar-list-item'>
          <a href="/categories">Categories</a>
          </li>
      </ul>
    </div>
  )
}

export default Admin