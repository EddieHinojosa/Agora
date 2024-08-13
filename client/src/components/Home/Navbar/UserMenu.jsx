import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiUser, CiShop } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";

const UserMenu = ({ setModalIsOpen }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (user) {
      logout();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <Link to="/user">
            <CiUser size={22} className="text-gray-500 hover:text-black" />
          </Link>
          {user.shopName && (
            <Link to={`/shopmanager/${user._id}`}>
              <CiShop size={22} className="text-gray-500 hover:text-black" />
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
  );
};

export default UserMenu;
