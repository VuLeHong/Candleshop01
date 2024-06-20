import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import './Navbar.css'
function NavScrollExample() {
  return (
    <div className="navbar">
      <div className="navbar-logo">VBCandle</div>
      <div className="navbar-menu">
        <a href="" className="navbar-link">Home</a>
        <a href="" className="navbar-link">Shop</a>
        <a href="" className="navbar-link">About</a>
        <a href="" className="navbar-link">FAQ</a>
      </div>
      <div className="navbar-icon">
        <IoMdSearch />
        <Link to = '/login'><CiUser /></Link>
        <CiShoppingCart />
      </div>
    </div>
  );
}

export default NavScrollExample;