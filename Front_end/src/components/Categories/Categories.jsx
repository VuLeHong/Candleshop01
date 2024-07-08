import React from 'react'
import './Categories.css'
import Sidebar from '../Sidebar/Sidebar'
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className='categories-container'>
      <Sidebar/>
      <div className='categories'>
        <div className="categories-top">
          <Link to='/categories/create' className='text-decoration-none'>
            <div className="create-button">
              <div className="create-button-left">+</div>
              <div className="create-button-right">Create</div>
            </div>
          </Link>
          <div className="categories-bottom">
            <div className="categories-bottom-title">
              <div className="padding-right-10"><p>Name</p></div>
              <p>Actions</p>
            </div>
            <div className="categories-bottom-lists">
              <div className="padding-right-7"><p>Spring</p></div>
              <div className="no-padding"><p>Details</p></div>
              <RiEditBoxFill className='categories-icon' />
              <MdDelete className='categories-icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories