import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  var auth = sessionStorage.getItem("user")
  const history = useNavigate();
  const logout = () => {
    alert("Bai bai")
    sessionStorage.clear();
    auth = null;
    history("/")
  }

  return (
    <div className="navbar">
      <a className="navbar-logo" href="/">VBCandle</a>
      <div className="navbar-menu">
        <Link to = '/' className="text-decoration-none navbar-link">Home</Link>
        <Link to = '/shop' className="text-decoration-none navbar-link">Shop</Link>
        <Link to = '/about' className="text-decoration-none navbar-link">About</Link>
        <Link to = '/faq' className="text-decoration-none navbar-link">FAQ</Link>
      </div>
      {
        auth === null
        ?
        <div className="navbar-icon">
          <IoMdSearch />
          <Link to = '/login' className="text-decoration-none"><CiUser /></Link>
          <Link to='/cart' className="text-decoration-none"><CiShoppingCart /></Link>
        </div>
        :
        <div className="navbar-icon">
          <IoMdSearch />
          <Link to='/cart' className="text-decoration-none"><CiShoppingCart /></Link>  
          <CiLogout onClick={logout} />
        </div>
      }
    </div>
  );
}

export default Navbar;