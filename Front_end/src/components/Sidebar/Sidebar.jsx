import React from 'react'
import './Sidebar.css'
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'

const Admin = () => {

  const history = useNavigate();
  const logout = () => {
    alert("Bai bai")
    sessionStorage.clear();
    history("/")
  }

  return (
    <div className='sidebar'>
      <CiLogout className='sidebar-logo-logout' onClick={logout} />
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