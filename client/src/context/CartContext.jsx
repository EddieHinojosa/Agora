import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, selectedSize, selectedColor, selectedMaterial) => {
        setCartItems(prevItems => [
            ...prevItems,
            { ...product, selectedSize, selectedColor, selectedMaterial, price_id: product.price }
        ]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
