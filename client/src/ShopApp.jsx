import { Outlet } from 'react-router-dom';
import ShopNavbar from './components/shop-manager/ShopNavbar'
import ShopSidebar from './components/shop-manager/ShopSidebar'
import Footer from './components/Footer'

function ShopApp() {
    return (
        <div className='flex flex-col h-screen'>
            <ShopNavbar />
            <div className='flex flex-1'>
                <ShopSidebar />
                <main className='w-5/6 p-4'>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default ShopApp