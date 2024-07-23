import React, { useState, useEffect } from 'react';
import './Cart.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [images, setImages] = useState({});
    const [quantities, setQuantities] = useState({});
    const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem("cartItems")) || {});

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/showproduct');
            response.data.forEach(product => getImageById(product.id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const getImageById = async (id) => {
        try {
            const response = await axios.post('http://localhost:5000/getimage', { id }, { responseType: 'arraybuffer' });
            const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
            setImages(prevImages => ({ ...prevImages, [id]: imageUrl }));
        } catch (error) {
            console.error(`Error fetching image for product ${id}:`, error.message);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: newQuantity
        }));
    };

    const handleRemoveProduct = (id) => {
        const updatedCartItems = { ...cartItems };
        delete updatedCartItems[id];
        setCartItems(updatedCartItems);
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };

    const calculateSubtotal = () => {
        return Object.entries(cartItems).reduce((subtotal, [id, cartItem]) => {
            const quantity = quantities[id] || 1;
            return subtotal + (cartItem.Price * quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();

    return (
        <div>
            <Navbar/>
            <div className='cart'>
                <div className="cart-header">
                    <h1>Your cart</h1>
                    <Link to='/shop' className='text-decoration-none'><u>Continue shopping</u></Link>
                </div>
                <div className="cart-title">
                    <p className='more-space'>PRODUCT</p>
                    <p>PRICE</p>
                    <p>QUANTITY</p>
                    <p>TOTAL</p>
                </div>
                {Object.entries(cartItems).map(([id, cartItem]) => (
                    <div className="cart-list" key={id}>
                        <div className="cart-list-product">
                            <div className='cart-list-product-img'>
                                <img src={images[cartItem.id]} alt={cartItem.Name} />
                            </div>
                            <div className='cart-list-product-text'>
                                <p>{cartItem.Name}</p>
                                <u onClick={() => handleRemoveProduct(id)}>Remove</u>
                            </div>
                        </div>
                        <p>{cartItem.Price} VND</p>
                        <input 
                            type="number" 
                            min="0" 
                            value={quantities[id] || 1} 
                            onChange={(e) => handleQuantityChange(id, e.target.value)}
                        />
                        <p>{(cartItem.Price * (quantities[id] || 1))} VND</p>
                    </div>
                ))}
                <div className="cart-bottom">
                    <p>Subtotal: {subtotal} VND</p>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to='/check-out' className='text-decoration-none'>
                        <button>CHECK OUT</button>
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Cart;
