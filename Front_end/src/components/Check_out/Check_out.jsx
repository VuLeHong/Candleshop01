import React, { useState } from 'react';
import './Check_out.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Check_out = () => {

  const current = useLocation()
  const value = current.state || undefined;
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || {};
  const [images, setImages] = useState({});
  const total = value.t;
  const quantities = value.q;

  const [User_name,setUser_name] = useState('')
  const [Gmail,setGmail] = useState('')
  const [Phone_Number,setPhone_Number] = useState('')
  const [Address,setAddress] = useState('') 

  const history = useNavigate()

  const getImageById = async (id) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/product_image/:id', { id }, { responseType: 'arraybuffer' });
        const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
        setImages(prevImages => ({ ...prevImages, [id]: imageUrl }));
    } catch (error) {
        console.error(`Error fetching image for product ${id}:`, error.message);
    }
  };

  const nofify = () => {
    alert("Ban da dat hang thanh cong")
  }

  function submit(e) {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/api/v1/order",{
        User_name, Gmail, Phone_Number, Address
      })

      .then (res=>{
        if (res.status === 200) {
          console.log(res);
          try {
            axios.post(`http://localhost:5000/api/v1/order_payment/${res}`,{
              total
            })

            .then(res=>{
              if (res.status === 200) {

              }
              else if (res.status === 500) {
                alert("Server dang bi loi")
              }
            })

            .catch(e=>{
              alert("Wrong details")
              console.log(e);
            })

          } catch (e) {
              console.log(e);
          }

          try {
            axios.put(`http://localhost:5000/api/v1/order/${res}`,{
              cartItems
            })

            .then(res=>{
              if (res.status === 200) {

              }
              else if (res.status === 500) {
                alert("Server dang bi loi")
              }
            })

            .catch(e=>{
              alert("Wrong details")
              console.log(e);
            })

          } catch (e) {
              console.log(e);
          }

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

  console.log(cartItems)

  return (
    <div>
      <Navbar/>
      <div className='check-out'>
        <form className='checkout-container' onSubmit={submit}>
          <div className='checkout-form'>
            <h2>Billing Details</h2>
            <div>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' onChange={(e) => {setUser_name(e.target.value)}} required/>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' onChange={(e) => {setGmail(e.target.value)}} required/>
              </div>
              <div className='form-group'>
                <label htmlFor='address'>Phone</label>
                <input type='text' onChange={(e) => {setPhone_Number(e.target.value)}} required/>
              </div>
              <div className='form-group'>
                <label htmlFor='city'>Address</label>
                <input type='text' onChange={(e) => {setAddress(e.target.value)}} required/>
              </div>
            </div>
          </div>
          <div className='order-summary'>
            <h2>Order Summary</h2>
            {
              Object.entries(cartItems).map(([id, cartItem]) => (
                <div className='order-item'>
                  <span>{cartItem.Name}</span>
                  <span>Quantity: {quantities[id]}</span>
                  <span>{cartItem.Price * (quantities[id])}</span>
                </div>
            ))}
            <div className='order-total'>
              <span>Total</span>
              <span>{total}</span>
            </div>
            <button type='submit' onClick={nofify}>Place Order</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Check_out;
