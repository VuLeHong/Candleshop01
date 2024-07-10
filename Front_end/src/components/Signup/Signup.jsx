import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import axios from 'axios'

const Signup = () => {

  const [gmail, setGmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate();

  function submit(e) {
    e.preventDefault(); 
    try {
      axios.post("http://localhost:5000/signup",{
        gmail, password
      })

      .then (res=>{
        if (res.status === 200) {
          sessionStorage.setItem("user",JSON.stringify(res.data))
          history("/")
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
    <form className='signup' onSubmit={submit}>
      <h1 className='signup-top'>Create Account</h1>
      <div className='signup-middle'>
        <div className="signup-form-email">
          <p>Email address</p>
          <input type="text" className="signup-input" onChange={(e) => {setGmail(e.target.value)}} />
        </div>
        <div className="signup-form-password">
          <p>Password</p>
          <input type="password" className="signup-input"  onChange={(e) => {setPassword(e.target.value)}} />
        </div>
      </div>
      <div className="signup-bottom">
        <button>CREATE</button>
      </div>
    </form>
    <Footer/>
    </div>
  )
}

export default Signup