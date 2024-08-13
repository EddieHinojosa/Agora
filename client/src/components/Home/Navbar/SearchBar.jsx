import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../../api/searchApi";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const products = await searchProducts(searchQuery);
      navigate("/results", { state: { products } });
      setSearchQuery("");
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-1 pr-12 border border-gray-300 rounded-lg"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
