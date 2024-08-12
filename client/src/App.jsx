import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Home/Navbar/Navbar.jsx';
import Footer from './components/Home/Footer.jsx';
import Cart from './pages/main/Cart.jsx';
import { CartProvider } from './context/CartContext';


function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <CartProvider>
            <>
                <Navbar setModalIsOpen={setModalIsOpen} />
                <main>
                    <Outlet />
                        <Cart isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
                </main>
                <Footer />
            </>
        </CartProvider>
    );
}

export default App;


