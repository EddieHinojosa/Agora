import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';

const Categories = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='border-b border-gray-100 pb-4'>
            <div className='flex md:hidden justify-between items-center mb-4'>
                <button onClick={toggleMenu} className='ml-4'>
                    {isOpen ? <IoClose size={26} className='text-gray-500' /> : <IoMenu size={26} className='text-gray-500' />}
                </button>
            </div>
            <div className={`flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
                <Link to='#' className='hover:underline text-sm'>Accessories</Link>
                <Link to='#' className='hover:underline text-sm'>Art & Collectibles</Link>
                <Link to='#' className='hover:underline text-sm'>Clothing</Link>
                <Link to='#' className='hover:underline text-sm'>Home Decor</Link>
                <Link to='#' className='hover:underline text-sm'>Food & Drink</Link>
                <Link to='#' className='hover:underline text-sm'>Jewelry</Link>
                <Link to='#' className='hover:underline text-sm'>Paper & Novelty</Link>
            </div>
        </nav>
    );
};

export default Categories;


