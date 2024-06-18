import React from 'react'
// import { Link } from 'react-router-dom'
import zalopay from '../../assets/zalopay.jpg'
import momo from '../../assets/momo.jpg'
import visa from '../../assets/visa.jpg'
import '../Footer/Footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-top">
            <div className="footer-link">
                <div className="footer-link-top">
                    <h2>Quick Links</h2>
                </div>
                <div className="footer-link-bottom">
                    {/* <Link><p2>Terms of Service</p2></Link>
                    <Link><p2>Shipping Policy</p2></Link>
                    <Link><p2>Refund policy</p2></Link>
                    <Link><p2>Privacy Policy</p2></Link> */}
                    <p>Terms of Service</p>
                    <p>Shipping Policy</p>
                    <p>Refund policy</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
            <div className="footer-letter">
                <h2>Newsletter</h2>
                <form action="">
                    <input type="text" placeholder='Email address' />
                    <button>SUBCRIBE</button> 
                </form>  
            </div>
        </div>
        <div className="footer-bottom">
            <div className="footer-bottom-left">
                <img src={zalopay} />
                <img src={momo} />
                <img src={visa} />
            </div>
            <div className="footer-bottom-right">
                <div className="footer-bottom-right-top">
                    <FaFacebook className='social-logo' />
                    <FaInstagramSquare className='social-logo' />
                </div>
                <div className="footer-bottom-right-bottom">
                    <p>© 2024, shopmicandle Powered by VB</p>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default Footer