import React from 'react'
import './Shop.css'
import Dropdown from 'react-bootstrap/Dropdown';
import product1 from './product1.jpg'

const Shop = () => {
  return (
    <div className='shop'>
        <div className="shop-top">
            <h1>Products</h1>
        </div>
        <div className="shop-middle">
            <div className="shop-middle-left">
                <p>SORT BY</p>
                <Dropdown>
                    <Dropdown.Toggle variant="antiquewhite" id="dropdown-basic">
                        Alphabetically, A-Z
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Alphabetically, Z-A</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Price, low to high</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Price, high to low</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="shop-middle-right">
                <p>5 products</p>
            </div>
        </div>
        <div className="shop-bottom">
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
            <div className="shop-bottom-list">
                <img src={product1} />
                <p>Baked Goods | MICANDLE</p>
                <p>$35.00</p>
            </div>
        </div>
    </div>
  )
}

export default Shop