import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Cart = ({ isOpen, onRequestClose }) => {
    // const { user } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${import.meta.env.MODE === 'production' 
                        ? import.meta.env.VITE_PROD_API_URL 
                        : import.meta.env.VITE_DEV_API_URL}/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        price: item.price_id,
                        quantity: 1, //hardcoded quantity, import from cart later wchi comes from details.jsx
                        name: item.productName,
                        // description: `${item.selectedSize}, ${item.selectedColor}, ${item.selectedMaterial}`,
                    })),
                }),
            });
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Error: ${response.statusText} - ${errorDetails.error}`);
            }
            const { url } = await response.json();
            window.location.href = url; // Redirect to Stripe Checkout
        } catch (error) {
            console.error('Checkout Error:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: 'auto',
                    width: '100%',
                    maxWidth: '400px',
                    height: '100%',
                    padding: '0',
                    border: 'none',
                    borderRadius: '0',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 15px'
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }
            }}
        >
            <div className="h-full bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Shopping Cart</h2>

                <div className="mt-6 grid grid-cols-1 gap-6">
                    <div className="">
                        <div className="bg-white shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h1 className="text-lg font-medium leading-6 text-gray-900">Items</h1>
                                <div className="mt-4 space-y-4">
                                    {cartItems.length === 0 ? (
                                        <p>Your cart is empty.</p>
                                    ) : (
                                        cartItems.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center p-4 border-b">
                                                <div>
                                                    <div className="text-lg">{item.productName}</div>
                                                    <div className="text-sm text-gray-500">Size: {item.selectedSize}</div>
                                                    <div className="text-sm text-gray-500">Color: {item.selectedColor}</div>
                                                    <div className="text-sm text-gray-500">Material: {item.selectedMaterial}</div>
                                                </div>
                                                <div className="text-lg">${item.price}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                            <h2 className="text-lg font-medium leading-6 text-gray-900">Summary</h2>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-lg">
                                    <div>Subtotal</div>
                                    <div>${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</div>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <div>Total</div>
                                    <div>${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col space-y-4">
                                <button
                                    onClick={handleCheckout}
                                    className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none sm:w-auto sm:text-sm"
                                >
                                    Checkout
                                </button>
                                <button
                                    onClick={onRequestClose}
                                    className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none sm:w-auto sm:text-sm"
                                >
                                    Continue shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Cart;
