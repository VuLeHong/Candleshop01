import React from 'react'
import './Forgot.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Forgot = () => {
  return (
    <div>
        <Navbar/>
    <div className='forgot'>
        <h2 className='forgot-title'>RESET YOUR PASSWORD</h2>
        <p className='forgot-title'>We will send you an email to reset your password</p>
        <div className="forgot-form">
            <div className="forgot-form-top">
                <p>Email</p>
                <input type="text" />
            </div>
            <div className="forgot-form-middle">
                <button>SUBMIT</button>
            </div>
            <div className="forgot-form-bottom">
                <a href="/login" className='text-decoration-none'>Cancel</a>
            </div>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Forgot