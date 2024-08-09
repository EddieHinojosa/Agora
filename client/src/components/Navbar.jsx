import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiUser, CiShop } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";
import { IoMenu, IoClose } from "react-icons/io5";
import { searchProducts } from '../api/searchApi'

const Navbar = ({ setModalIsOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const products = await searchProducts(searchQuery);
      navigate('/results', { state: { products }})
    } catch (error) {
      console.error('Error searching for products:', error)
    }
  }

  const handleLogout = () => {
    if (user) {
      logout(navigate);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b border-gray-100 pb-4">
      <div className="flex items-center justify-between p-4">
        <div className="flex md:hidden justify-between items-center">
          <button onClick={toggleMenu} className="mt-1.5">
            {isOpen ? (
              <IoClose size={26} className="text-gray-500" />
            ) : (
              <IoMenu size={26} className="text-gray-500" />
            )}
          </button>
        </div>
        <div className="flex items-center brand-font">
          <Link to="/" className="mr-4 ml-2 text-3xl font-bold">
            agora
          </Link>
        </div>
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-1 pr-12 border border-gray-300 rounded-lg"
            />
            <button onClick={handleSearch} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className={`flex items-center space-x-4 md:flex-row md:space-y-0 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
          {user ? (
            <>
              <Link to="/user">
                <CiUser size={22} className="text-gray-500 hover:text-black" />
              </Link>
              {user.shopName && (
                <Link to={`/shopmanager/${user._id}`}>
                  <CiShop
                    size={22}
                    className="text-gray-500 hover:text-black"
                  />
                </Link>
              )}
              <button onClick={handleLogout} className="text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login/usersignup" className="text-sm">
                Sell
              </Link>
              <Link to="/login" className="text-sm">
                Login
              </Link>
              <Link to="/login/usersignup" className="text-sm">
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={() => setModalIsOpen(true)}
            className="inline-flex justify-center px-4 py-2 text-base font-medium text-gray-500 border border-transparent rounded-md shadow-sm hover:text-black focus:outline-none sm:w-auto sm:text-sm"
          >
            <MdOutlineShoppingBag
              size={22}
              className="text-gray-500 hover:text-black"
            />
          </button>
        </div>
      </div>

      {/* Lower Navbar */}
      <div
        className={`flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <Link to="#" className="hover:underline text-sm">
          Accessories
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Art
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Collectibles
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Clothing
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Home Decor
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Food & Drink
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Jewelry
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Paper
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Novelty
        </Link>
        <Link to="#" className="hover:underline text-sm">
          Pets
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


{
  /* If USER is logged in, navbar changes: */
}
{
  /* <Link to="/user"><CiUser /></Link> */
}

{
  /* If SHOP OWNER is logged in, navbar changes:*/
}
{
  /* <Link to="/shopmanager"><CiShop /></Link> */
}
{
  /* <Link to="/user"><CiUser /></Link> */
}
{
  /* <Link to="/cart"><MdOutlineShoppingBag /></Link> */
}
