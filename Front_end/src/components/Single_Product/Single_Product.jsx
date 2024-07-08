import React from 'react'
import './Single_Product.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import product1 from './product1.jpg'
import { Link } from 'react-router-dom'

const Single_Product = () => {
  return (
    <div>
        <Navbar/>
        <div className='single-product'>
            <div className="single-product-left">
                <img src={product1} alt="product1" />
            </div>
            <div className="single-product-right">
                <b>Siesta | MICANDLE</b>
                <p>$25.00</p>
                <p>Shipping calculated at checkout.</p>
                <Link to='/cart' className='text-decoration-none'><button className="add-to-cart">ADD TO CART</button></Link>
                <Link to='/check-out' className='text-decoration-none'><button className="buy-now">BUY NOW</button></Link>
                <p>A pillowy powder fresh aroma with an underlying deep yet subtle sweetness to relax and calm your space with notes of tonka oud and vanilla. Whether you're having a chill or chore day at home, this candle scent will surely add love and light into your space.</p>
                <p>Product Info: </p>
                <p>100% soy wax candle with crackling wooden wick in glossy black glass tumbler. 10 ounces (283g). 3.5 inches (8.9cm) tall. Roughly 50 hour burn time.</p>
                <p>Our candles are made with thoughtfully crafted fine fragrance blends, hand poured in small batches, and are non-toxic and environmentally friendly. Made in USA.</p>
                <p>Always burn candle within sight and away from drafts and things that can catch fire. Keep away from children and pets. Do not burn for longer than 4 hours. Stop burning when 1/2" of unmelted wax remains. </p>
                <p>To ensure good burns, always trim wick to 3/16" (5mm) before lighting. You may use a wick trimmer or nail cutter to remove excess used wick. Always allow your first burn to form a full melt pool to avoid tunneling. </p>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Single_Product