
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import AuthContext from '../context/AuthContext';

const Cart = ({ isOpen, onRequestClose }) => {
    const { user } = useContext(AuthContext);

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [
                        { name: "Clarissa's socks", amount: 1000, quantity: 1 },
                        { name: "Devon's Hawaiian shirts", amount: 2000, quantity: 1 },
                        { name: "Alex's pants", amount: 3000, quantity: 1 },
                    ],
                }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const { url } = await response.json();
            console.log('Stripe Checkout URL:', url);
            window.location = url; // Redirect to Stripe Checkout
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
                    width: '25%',
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
            <div className="h-full bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">Shopping Cart</h2>

                <div className="mt-8 grid grid-cols-1 gap-6">
                    <div className="">
                        <div className="bg-white shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h1 className="text-lg font-medium leading-6 text-gray-900">Items</h1>
                                <div className="mt-4 space-y-4">
                                    <div className="flex justify-between items-center p-4 border-b">
                                        <div className="text-lg">Clarissa's socks</div>
                                        <div className="text-lg">$10.00</div>
                                    </div>
                                    <div className="flex justify-between items-center p-4 border-b">
                                        <div className="text-lg">Devon's Hawaiian shirts</div>
                                        <div className="text-lg">$20.00</div>
                                    </div>
                                    <div className="flex justify-between items-center p-4 border-b">
                                        <div className="text-lg">Alex's pants</div>
                                        <div className="text-lg">$30.00</div>
                                    </div>
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
                                    <div>$60.00</div>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <div>Tax</div>
                                    <div>$5.00</div>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <div>Total</div>
                                    <div>$65.00</div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                {/* Uncomment this block for live site */}
                                {/* {user ? (
                                    <button
                                        onClick={handleCheckout}
                                        className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none sm:w-auto sm:text-sm"
                                    >
                                        Checkout
                                    </button>
                                ) : (
                                    <Link 
                                        to="/login" 
                                        className="text-red-500 hover:text-red-700 hover:underline"
                                    >
                                        Please log in to checkout
                                    </Link>
                                )} */}
                                
                                {/* Temporary block for testing */}
                                <button
                                    onClick={handleCheckout}
                                    className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none sm:w-auto sm:text-sm"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={onRequestClose} className="mt-4 inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none sm:w-auto sm:text-sm">
                    Continue shopping
                </button>
            </div>
        </Modal>
    );
};

export default Cart;
