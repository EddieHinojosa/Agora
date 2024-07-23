import { Link } from 'react-router-dom';

const ShopSidebar = () => {
    return (
        <nav className='w-1/6 h-screen bg-gray-100 flex flex-col justify-between'>
            <div className='flex flex-col h-full p-4 space-y-6'>
                <Link to='/shopmanager/shophome' className='hover:underline'>Shop Home</Link>
                <Link to='/shopmanager/orders' className='hover:underline'>Orders</Link>
                <Link to='/shopmanager/messages' className='hover:underline'>Messages</Link>
                <Link to='/shopmanager/products' className='hover:underline'>Products</Link>
                <Link to='/shopmanager/calendar' className='hover:underline'>Calendar</Link>
                <Link to='/shopmanager/settings' className='hover:underline'>Settings</Link>
            </div>
        </nav>
    );
};

export default ShopSidebar;
