import React, { useState, useEffect } from 'react';
import './Check_out.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Check_out = () => {

  const current = useLocation()
  const value = current.state || undefined;
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || {};
  const [images, setImages] = useState({});
  const total = value.t;

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('') 

  const getImageById = async (id) => {
    try {
        const response = await axios.post('http://localhost:5000/getimage', { id }, { responseType: 'arraybuffer' });
        const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
        setImages(prevImages => ({ ...prevImages, [id]: imageUrl }));
    } catch (error) {
        console.error(`Error fetching image for product ${id}:`, error.message);
    }
  };

  function submit(e) {
    e.preventDefault();

    try {
      axios.post("http://localhost:5000/order_create",{
        name, email, phone, address
      })

      .then (res=>{
        if (res.status === 200) {
          history('/')
        }
        else if (res.status === 500) {
          alert("Server dang bi loi")
        }
      })

      .catch(e=>{
        alert("Wrong details")
        console.log(e);
      })
    }

    catch(e) {
      console.log(e);
    }

  }

  return (
    <div>
      <Navbar/>
      <div className='check-out'>
        <div className='checkout-container'>
          <div className='checkout-form'>
            <h2>Billing Details</h2>
            <form onSubmit={submit}>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' onChange={(e) => {setName(e.target.value)}} required/>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' onChange={(e) => {setEmail(e.target.value)}} required/>
              </div>
              <div className='form-group'>
                <label htmlFor='address'>Phone</label>
                <input type='text' onChange={(e) => {setPhone(e.target.value)}} required/>
              </div>
              <div className='form-group'>
                <label htmlFor='city'>Address</label>
                <input type='text' onChange={(e) => {setAddress(e.target.value)}} required/>
              </div>
            </form>
          </div>
          <div className='order-summary'>
            <h2>Order Summary</h2>
            {
              Object.entries(cartItems).map(([id, cartItem]) => (
                <div className='order-item'>
                  <span>{cartItem.Name}</span>
                  {/* <span><img className='cart-list-product-img' src={images[cartItem.id]} alt={cartItem.Name} /></span> */}
                  {/* <span>{cartItem.Price} VND</span> */}
                </div>
            ))}
            <div className='order-total'>
              <span>Total</span>
              <span>{total}</span>
            </div>
            <button type='submit'>Place Order</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Check_out;
