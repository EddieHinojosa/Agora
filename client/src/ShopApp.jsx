import { Outlet } from 'react-router-dom';
import ShopNavbar from './components/ShopManager/Main/ShopNavbar';
import ShopSidebar from './components/ShopManager/Main/ShopSidebar';
import Footer from './components/Footer';

const ShopApp = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <ShopNavbar />
            <div className='flex flex-col md:flex-row flex-1'>
                <ShopSidebar />
                <main className='w-full md:w-5/6 p-4'>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default ShopApp;
