import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { AuthContext } from "../../../context/AuthContext";

const ShopSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <nav className='w-full md:w-1/6 border border-gray-100 flex flex-col md:flex-col'>
            <div className='flex md:hidden p-4 justify-between items-center'>
                <button onClick={toggleMenu}>
                    {isOpen ? <IoClose size={26} className='text-gray-500'/> : <IoMenu size={26} className='text-gray-500' />}
                </button>
            </div>
            <div className={`flex-col md:flex md:h-full p-4 space-y-4 ${isOpen ? 'flex items-center justify-start w-full' : 'hidden md:flex md:items-start'}`}>
                {user && user._id && user.shopName && (
                    <>
                        <Link to={`/shopmanager/${user._id}`} className='mt-2 hover:underline text-sm text-center md:text-left'>Shop Home</Link>
                        <Link to={`/shopmanager/${user._id}/orders`} className='hover:underline text-sm text-center md:text-left'>Orders</Link>
                        <Link to={`/shopmanager/${user._id}/messages`} className='hover:underline text-sm text-center md:text-left'>Messages</Link>
                        <Link to={`/shopmanager/${user._id}/products/`} className='hover:underline text-sm text-center md:text-left'>Products</Link>
                        <Link to={`/shopmanager/${user._id}/finances/`} className='hover:underline text-sm text-center md:text-left'>Finances</Link>
                        <Link to={`/shopmanager/${user._id}/calendar/`} className='hover:underline text-sm text-center md:text-left'>Calendar</Link>
                        <Link to={`/shopmanager/${user._id}/settings/`} className='hover:underline text-sm text-center md:text-left'>Settings</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default ShopSidebar;




