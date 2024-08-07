import React, { useEffect, useState } from 'react';
import './Categories.css'
import Sidebar from '../Sidebar/Sidebar'
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {

  const [categories,setCategories] = useState([])

  const getCategories = async () => {
    try {
      const response = await axios.get('https://nenshop.onrender.com/api/v1/category');
      setCategories(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='categories-container'>
      <Sidebar/>
      <div className='categories'>
        <div className="categories-top">
          <div className="create-button">
            <Link to='/categories/create' className='text-decoration-none'>
              <div className="create-button-right">Create</div>
            </Link>
          </div>
          <div className="categories-bottom">
            <div className="categories-bottom-title">
              <div className="padding-right-10"><p>Name</p></div>
              <p>Actions</p>
            </div>
            {categories.map(category => ( 
              <div className="categories-bottom-lists">
                <div className="padding-right-7"><p>{category.Name}</p></div>
                <div className="no-padding"><p>Details</p></div>
                <RiEditBoxFill className='categories-icon' />
                <MdDelete className='categories-icon' />
              </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories