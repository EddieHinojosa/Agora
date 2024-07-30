import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
//imported Modal because the Cart component uses it
import Modal from 'react-modal'; 

//this is added strictly for appReaders to know where the modal is being used
//this is not necessary for the code to function, but creates a console warning if not set
Modal.setAppElement('#root');



function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Navbar setModalIsOpen={setModalIsOpen} />
      <main>
        <Outlet />
        <Cart isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
      </main>
      <Footer />
    </>
  )
}

export default App;
