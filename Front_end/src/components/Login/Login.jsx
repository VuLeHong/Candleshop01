import { Link } from 'react-router-dom'
import './Login.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function Login() {
  return (
    <div>
      <Navbar/>
    <div className="login">
      <h1 className='login-top'>Login</h1>
      <div className='login-middle'>
        <div className="login-form-email">
          <p>Email address</p>
          <input type="text" className="login-input" />
        </div>
        <div className="login-form-password">
          <p>Password</p>
          <input type="text" className="login-input" />
        </div>
      </div>
      <div className="login-bottom">
        <Link to = '/forgot' className='text-decoration-none'><p>Forgot your password</p></Link>
        <button>SIGN IN</button>
        <Link to = '/signup' className='text-decoration-none'><p>Create account</p></Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Login;