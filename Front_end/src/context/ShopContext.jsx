import React, { useState, useEffect } from 'react'
import { createContext } from "react";
import axios from 'axios';
import baseUrl from "../../axiosConfig"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const [products,setProducts] = useState([])


    const getDefaultCart = ()=>{
        let cart = {};
        for (let index = 0; index < products.length+1; index++) {
            cart[index] = 0;
        }
        return cart;
    }

    const [cartItems, setCartItems] = useState(getDefaultCart)

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,itemId:prev[itemId]+1}))
        console.log(cartItems)
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:0}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                let itemInfo = products.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,products,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider