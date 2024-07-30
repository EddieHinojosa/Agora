import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiUser, CiShop } from 'react-icons/ci';
import AuthContext from '../context/AuthContext';

const Navbar = ({ setModalIsOpen }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSellClick = () => {
        if (user.shopName) {
            navigate('/shopmanager');
        } else {
            navigate('/update-profile');
        }
    };

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <nav className="flex border border-gray-100 items-center justify-between p-4">
            <div className="flex items-center brand-font">
                <Link to="/" className="mr-4 text-3xl font-bold">
                    agora
                </Link>
            </div>
            <div className="flex-grow mx-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder=""
                        className="w-full p-1 pr-12 border border-gray-300 rounded-lg"
                    />
                    <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <button onClick={handleSellClick} className="text-sm">
                            Sell
                        </button>
                        <Link to="/user"><CiUser size={22} className='text-gray-500 hover:text-black' /></Link>
                        {user.shopName && <Link to="/shopmanager"><CiShop size={22} className='text-gray-500 hover:text-black' /></Link>}
                        <button onClick={handleLogout} className="text-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login/usersignup" className="text-sm">
                            Sell
                        </Link>
                        <Link to="/login" className="text-sm">
                            Login
                        </Link>
                        <Link to="/login/usersignup" className="text-sm">
                            Sign Up
                        </Link>
                    </>
                )}
                <button onClick={() => setModalIsOpen(true)} className="inline-flex justify-center px-4 py-2 text-base font-medium text-gray-500 border border-transparent rounded-md shadow-sm hover:text-black focus:outline-none sm:w-auto sm:text-sm">
                    <MdOutlineShoppingBag size={22} className='text-gray-500 hover:text-black'/>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;


        {/* If USER is logged in, navbar changes: */}
        {/* <Link to="/user"><CiUser /></Link> */}

        {/* If SHOP OWNER is logged in, navbar changes:*/}
        {/* <Link to="/shopmanager"><CiShop /></Link> */}
        {/* <Link to="/user"><CiUser /></Link> */}
        {/* <Link to="/cart"><MdOutlineShoppingBag /></Link> */}