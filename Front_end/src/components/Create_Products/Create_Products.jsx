import React from 'react'
import './Create_Products.css'
import Sidebar from '../Sidebar/Sidebar'

const Create_Products = () => {
  return (
    <div className='create-products-container'>
        <Sidebar/>
        <div className="create-products">
            <div className="create-products-item">
                <label htmlFor="">Name</label>
                <select className='create-products-select-box'>
                    <option value="A"></option>
                    <option value="B">B</option>
                </select>
            </div>
            <div className="create-products-item">
                <label htmlFor="">Category</label>
                <select className='create-products-select-box'>
                    <option value="A"></option>
                    <option value="B">B</option>
                </select>
            </div>
            <div className="create-products-item">
                <p>Quantity</p>
                <input type="number" min="1" />
            </div>
            <div className="create-products-item-bigger-box">
                <p>Description</p>
                <textarea rows="4" cols="50"></textarea>
            </div>
            <div className="create-products-item">
                <p>Price(VND)</p>
                <input type="number" min="0" />
            </div>
            <div className="create-products-item">
                <p>Discount(%)</p>
                <input type="number" min="0" />
            </div>
            <div className="create-products-item-bigger-box">
                <p>Detail</p>
                <textarea rows="4" cols="50"></textarea>
            </div>
        </div>
    </div>
  )
}

export default Create_Products