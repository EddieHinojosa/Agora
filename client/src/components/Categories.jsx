import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';

const ShopSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='border-b border-gray-100 pb-4'>
            <div className='flex md:hidden justify-between items-center mb-4'>
                <button onClick={toggleMenu}>
                    {isOpen ? <IoClose size={26} className='text-gray-500' /> : <IoMenu size={26} className='text-gray-500' />}
                </button>
            </div>
            <div className={`flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
                <Link to='/shopmanager/' className='hover:underline text-sm'>Shop Home</Link>
                <Link to='/shopmanager/orders' className='hover:underline text-sm'>Orders</Link>
                <Link to='/shopmanager/messages' className='hover:underline text-sm'>Messages</Link>
                <Link to='/shopmanager/products' className='hover:underline text-sm'>Products</Link>
                <Link to='/shopmanager/finances' className='hover:underline text-sm'>Finances</Link>
                <Link to='/shopmanager/calendar' className='hover:underline text-sm'>Calendar</Link>
                <Link to='/shopmanager/settings' className='hover:underline text-sm'>Settings</Link>
            </div>
        </nav>
    );
};

export default ShopSidebar;


