import React, { useEffect, useState } from 'react';
import './Products.css'
import Sidebar from '../Sidebar/Sidebar'
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios'

const Products = () => {

  const [products,setProducts] = useState([])

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/showcategory');
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='products-container'>
      <Sidebar/>
      <div className='products'>
        <div className="products-top">
          <div className='create-button'>
            <Link to='/products/create' className='text-decoration-none'>
              <div className="create-button-right">Create</div>
            </Link>
          </div>
        </div>
        <div className="products-bottom">
          <div className="products-bottom-title">
            <p>ID</p>
            <div className="padding-right-10"><p>Name/Brand</p></div>
            <p>Price</p>
            <p>Qty</p>
            <p>Actions</p>
          </div>
          <div className="products-bottom-lists">
            <p>#1</p>
            <div className="padding-right-7"><p>Siesta | MICANDLE</p></div>
            <div className='padding-right-3'><p>$35</p></div>
            <p>2</p>
            <div className="no-padding"><p>Details</p></div>
            <RiEditBoxFill className='products-icon' />
            <MdDelete className='products-icon' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products