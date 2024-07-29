import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import React from 'react';

const Cart = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">Shopping Cart</h2>
            
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
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
                
                <div className="lg:col-span-4">
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
                            <Link
                                to="/"
                                className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none sm:w-auto sm:text-sm"
                            >
                                Continue Shopping
                            </Link>
                            <div className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none sm:w-auto sm:text-sm">
                                <Checkout />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
