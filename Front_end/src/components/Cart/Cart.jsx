import React from 'react'
import './Cart.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import product1 from './product1.jpg'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div>
        <Navbar/>
        <div className='cart'>
            <div className="cart-header">
                <h1>Your cart</h1>
                <u>Continue shopping</u>
            </div>
            <div className="cart-title">
                <p className='more-space'>PRODUCT</p>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>TOTAL</p>
            </div>
            <div className="cart-list">
                <div className="cart-list-product">
                    <div className='cart-list-product-img'>
                        <img src={product1} />
                    </div>
                    <div className='cart-list-product-text'>
                        <p>Siesta | MICANDLE</p>
                        <u>Remove</u>
                    </div>
                </div>
                <p>$35.00</p>
                <input type="number" min="0"/>
                <p>$100.00</p>
            </div>
            <div className="cart-bottom">
                <p>Subtotal: $100.00</p>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to='/check-out' className='text-decoration-none'><button>CHECK OUT</button></Link>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Cart