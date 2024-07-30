 import { useState } from "react";
 
 
 // Product Info Section
 const ProductInfo = () => (
    <div className="w-full flex flex-col space-y-4">
      {/* Product Name */}
      <div>
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={rows[0].productName}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter product name"
          onChange = {handleChange}
        />
      </div>

      {/* Product Details */}
      <div>
        <label
          htmlFor="productDetails"
          className="block text-sm font-medium text-gray-700"
        >
          Product Details
        </label>
        <textarea
          id="productDetails"
          name="productDetails"
          className="mt-1 p-2 block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter product details"
          onChange = {handleChange}
        />
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentStep(currentStep + 1)}
        className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );

  export default ProductInfo;