import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import NavLinks from "./NavLinks";

const Navbar = ({ setModalIsOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <SearchBar />
        </div>
        <div
          className={`flex items-center space-x-4 md:flex-row md:space-y-0 ${
            isOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <UserMenu setModalIsOpen={setModalIsOpen} />
        </div>
      </div>

      <NavLinks isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
