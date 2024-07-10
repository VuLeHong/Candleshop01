import React from 'react'
import './Signup.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Signup = () => {
  return (
    <div>
    <Navbar/>
    <div className='signup'>
      <h1 className='signup-top'>Create Account</h1>
      <div className='signup-middle'>
        <div className="signup-form-first-name">
          <p>First name</p>
          <input type="text" className='signup-input'/>
        </div>
        <div className="signup-form-last-name">
          <p>Last name</p>
          <input type="text" className="signup-input" />
        </div>
        <div className="signup-form-email">
          <p>Email address</p>
          <input type="text" className="signup-input" />
        </div>
        <div className="signup-form-password">
          <p>Password</p>
          <input type="text" className="signup-input" />
        </div>
      </div>
      <div className="signup-bottom">
        <button>CREATE</button>
      </div>
      
    </div>
    <Footer/>
    </div>
  )
}

export default Signup