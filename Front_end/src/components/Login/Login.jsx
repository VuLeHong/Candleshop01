import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Login.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import axios from 'axios'

const Login = () => {

  const [gmail, setGmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate();

  function submit(e) {
    e.preventDefault(); 
    try {
      axios.post("http://localhost:5000/login",{
        gmail, password
      })

      .then (res=>{
        if (res.status === 200) {
          sessionStorage.setItem("user",JSON.stringify(res.data))
          if (res.data === 1) history("/products")
          else history("/")
        }
        else if (res.status === 202) {
          alert("Sai mat khau")
        }
        else if (res.status === 204) {
          alert("Tai khoan khong ton tai")
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
      <form className="login" onSubmit={submit}>
        <h1 className='login-top'>Login</h1>
        <div className='login-middle'>
          <div className="login-form-email">
            <p>Email address</p>
            <input type="text" className="login-input" onChange={(e) => {setGmail(e.target.value)}} />
          </div>
          <div className="login-form-password">
            <p>Password</p>
            <input type="password" className="login-input" onChange={(e) => {setPassword(e.target.value)}} />
          </div>
        </div>
        <div className="login-bottom">
          <Link to = '/forgot' className='text-decoration-none'><p>Forgot your password</p></Link>
          <button>SIGN IN</button>
          <Link to = '/signup' className='text-decoration-none'><p>Create account</p></Link>
        </div>
      </form>
      <Footer/>
    </div>
  );
}

export default Login;