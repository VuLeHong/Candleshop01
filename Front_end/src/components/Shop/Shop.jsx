import React from 'react'
import './Shop.css'
import Dropdown from 'react-bootstrap/Dropdown';
import product1 from './product1.jpg'

const Shop = () => {
  return (
    <div className='shop'>
        <div className="shop-top">
            <p>Products</p>
        </div>
        <div className="shop-middle">
            <p>SORT BY</p>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className='drop-down-sort'>
                    Dropdown Button
                </Dropdown.Toggle>  
                <Dropdown.Menu className='drop-down-sort'>
                    <Dropdown.Item href="#/action-1">Featured</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Best selling</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Alphabetically, A-Z</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Alphabetically, Z-A</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Price, low to high</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Price, high to low</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Date, old to new</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Date, new to old</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <p>5 products</p>
        </div>
        <div className="shop-bottom">
            <img src={product1} />
            <p>Baked Goods | MICANDLE</p>
            <p>$35.00</p>
        </div>
    </div>
  )
}

export default Shop