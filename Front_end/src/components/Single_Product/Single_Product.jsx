import React from 'react'
import './Single_Product.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

const SingleProduct = () => {
  const current = useLocation()
  const value = current.state || undefined;
  const total = value.p.Price

  const [cartItems, setCartItems] = useState(() => {
    const savedItems = sessionStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : {};
  });

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[product.id]) {
        updatedItems[product.id].Quantity += 1;
        // updatedItems[product.id] = {
        //   id: product.id,
        //   Name: product.Name,
        //   Price: product.Price,
        //   maxQuantity: product.Quantity
        // };
      } else {
        updatedItems[product.id] = {
          id: product.id,
          Name: product.Name,
          Price: product.Price,
          Quantity: 1,
          maxQuantity: product.Quantity
        };
      }
      return updatedItems;
    });
  };

  const show = () => {
    toast.success("San pham da duoc dat thanh cong", {
      position: "top-right",
    });
    addToCart(value.p)
    // console.log(addToCart(value.p))
  }


  return (
    <div>
        <Navbar/>
        <div className='single-product'>
            <div className="single-product-left">
                <img src={value.i} alt={value.p.Name} />
            </div>
            <div className="single-product-right">
                <b>{value.p.Name}</b>
                <p>{value.p.Price} $</p>
                <p>Shipping calculated at checkout.</p>
                <div>
                  <button className="add-to-cart" onClick={show}>ADD TO CART</button>
                  <ToastContainer />
                </div>
                <Link to='/check-out' state={{t: total}} className='text-decoration-none'><button className="buy-now">BUY NOW</button></Link>
                <p>{value.p.Desc}</p>
                <p>Product Info: </p>
                <p>{value.p.Detail}</p>
                
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default SingleProduct