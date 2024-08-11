import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Modal from 'react-modal'; // upsed by the shopping cart
import { CartProvider } from './context/CartContext';

//this is added strictly for appReaders to know where the modal is being used
//this is not necessary for the code to function, but creates a console warning if not set
Modal.setAppElement('#root');


const modalStyles = {
    content: {
        top: '0',
        right: '0',
        bottom: '0',
        left: 'auto',
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        padding: '0',
        border: 'none',
        borderRadius: '0',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 15px'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
};

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <CartProvider>
            <>
                <Navbar setModalIsOpen={setModalIsOpen} />
                <main>
                    <Outlet />
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        contentLabel="Shopping Cart"
                        style={modalStyles}
                    >
                        <Cart isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
                    </Modal>
                </main>
                <Footer />
            </>
        </CartProvider>
    );
}

export default App;


