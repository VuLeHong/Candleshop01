import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import About from './components/About/About'
import Faq from './components/Faq/Faq';
import Shop from './components/Shop/Shop';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import './App.scss'
import Forgot from './components/Forgot/Forgot';
import Products from './components/Products/Products';
import Create_Products from './components/Create_Products/Create_Products';
import Categories from './components/Categories/Categories';
import Create_Categories from './components/Create-Categories/Create_Categories';
import Single_Product from './components/Single_Product/Single_Product';
import Cart from './components/Cart/Cart';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/create' element={<Create_Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/create' element={<Create_Categories />} />
          <Route path='/product/:id' element={<Single_Product />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
