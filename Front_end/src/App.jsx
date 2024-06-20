import NavScrollExample from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import About from './components/About/About'
import Faq from './components/Faq/Faq';
import Shop from './components/Shop/Shop';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavScrollExample/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/about' element={<About />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
