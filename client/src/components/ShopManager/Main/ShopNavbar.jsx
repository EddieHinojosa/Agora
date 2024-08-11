import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";

const ShopNavbar = () => {
    return (
        <nav className='p-2 border border-gray-100 flex justify-between items-center w-full'>
            <h1 className='ml-2 text-3xl'>agora</h1>
            <div>
                <Link to='/'><IoHomeOutline size={22} className='mr-2 text-gray-500 hover:text-black' /></Link>
            </div>
        </nav>
    );
};

export default ShopNavbar;
