import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ShopNavbar = () => {
    return (
        <nav className='bg-gray-100 p-2 flex justify-between items-center w-full'>
            <div className='text-lg font-bold'>Agora</div>
            <div>
                <Link to='/'><FaHome size={24} /></Link>
            </div>
        </nav>
    );
};

export default ShopNavbar;
