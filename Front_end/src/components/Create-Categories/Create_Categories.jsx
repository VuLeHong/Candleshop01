import React from 'react'
import './Create_Categories.css'
import Sidebar from '../Sidebar/Sidebar'

const Create_Categories = () => {
  return (
    <div className='create-categories-container'>
        <Sidebar/>
        <div className="create-categories">
            <div className="create-categories-item">
                <label>Name</label>
                <input type="text" />
            </div>
            <div className="create-categories-item-bigger-box">
                <p>Description</p>
                <textarea rows="4" cols="50"></textarea>
            </div>
        </div>
    </div>
  )
}

export default Create_Categories