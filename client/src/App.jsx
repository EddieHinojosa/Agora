import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Categories from './components/Categories'

function App() {

  return (
    <>
      <Navbar />
      <Categories />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
