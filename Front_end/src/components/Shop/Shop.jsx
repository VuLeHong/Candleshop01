import React, { useEffect, useState } from 'react';
import './Shop.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Shop = () => {

    const [products,setProducts] = useState([])
    const [images, setImages] = useState({});

    const getProducts = async () => {
        try {
          const response = await axios.get('https://nenshop.onrender.com/api/v1/product');
          setProducts(response.data);
          response.data.forEach(product => {
             getImageById(product.id)
          }
        );
        } catch (error) {
          console.error(error.message);
        }
      };
    
      const getImageById = async (id) => {
        try {
          const response = await axios.get(`https://nenshop.onrender.com/api/v1/product_image/${id}`, { responseType: 'arraybuffer' });
          const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
          setImages(prevImages => ({ ...prevImages, [id]: imageUrl }));
        } catch (error) {
          console.error(`Error fetching image for product ${id}:`, error.message);
        }
      };
    
      useEffect(() => {
        getProducts();
      }, []);

  return (
    <div className='shop'>
        <Navbar />
        <div className="shop-top">
            <h1>Products</h1>
        </div>
        <div className="shop-middle">
            <div className="shop-middle-left">
                <p>SORT BY</p>
                <Dropdown>
                    <Dropdown.Toggle variant="antiquewhite" id="dropdown-basic">
                        Alphabetically, A-Z
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Alphabetically, Z-A</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Price, low to high</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Price, high to low</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="shop-middle-right">
                <p>5 products</p>
            </div>
        </div>
        <div className="shop-bottom">
            {products.map(product => (
                <Link to={`/product/${product.id}`} state={{p: product, i: images[product.id]}} className='text-decoration-none' >
                    <div className="shop-bottom-list">
                        <img src={images[product.id]} />
                        <p>{product.Name}</p>
                        <p>{product.Price} VND</p>
                    </div>
                </Link>
            ))
            }
        </div>
        <Footer/>
    </div>
    
  )
}

export default Shop