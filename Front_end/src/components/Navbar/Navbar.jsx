import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import './Navbar.css'

function Navbar() {
  return (
    <div className="navbar">
      <a className="navbar-logo" href="/">VBCandle</a>
      <div className="navbar-menu">
        <a href="/" className="navbar-link">Home</a>
        <a href="/shop" className="navbar-link">Shop</a>
        <a href="/about" className="navbar-link">About</a>
        <a href="/faq" className="navbar-link">FAQ</a>
      </div>
      <div className="navbar-icon">
        <IoMdSearch />
        <Link to = '/login' className="text-decoration-none"><CiUser /></Link>
        <Link to='/cart' className="text-decoration-none"><CiShoppingCart /></Link>
      </div>
    </div>
  );
}

export default Navbar;