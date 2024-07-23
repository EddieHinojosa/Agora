import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
// import { CiUser } from 'react-icons/ci'
// import { MdOutlineShoppingBag } from "react-icons/md";
// import { CiShop } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center">
        <Link to="/" className="mr-4 text-xl font-bold">
          Agora
        </Link>
      </div>
      <div className="flex-grow mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder=""
            className="w-full p-1 pr-12 border-gray-300 rounded-lg"
          />
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/shopsignup" className="text-sm">
          Sell
        </Link>
        <Link to="/login" className="text-sm">
          Login
        </Link>
        <Link to="/usersignup" className="text-sm">
          Sign Up
        </Link>

        {/* If USER is logged in, navbar changes: */}
        {/* <Link to="/user"><CiUser /></Link> */}
        {/* <Link to="/cart"><MdOutlineShoppingBag /></Link> */}

        {/* If SHOP OWNER is logged in, navbar changes:*/}
        {/* <Link to="/shopmanager"><CiShop /></Link> */}
        {/* <Link to="/user"><CiUser /></Link> */}
        {/* <Link to="/cart"><MdOutlineShoppingBag /></Link> */}
        
      </div>
    </nav>
  );
};

export default Navbar;
