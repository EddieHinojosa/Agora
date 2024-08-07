import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Modal from 'react-modal';
import { CartProvider } from './context/CartContext';

Modal.setAppElement('#root');

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
                        style={{
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
                        }}
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
