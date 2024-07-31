import React from "react";

// Product Price and Quantity Section
const ProductPricing = ({ onNext, onPrevious, rows, handleChange }) => (
    <div>
      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="mt-14 block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            id="price"
            name="Price"
            value={rows.price}
            className="p-2 block w-1/4 pl-7 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="0.00"
            onChange = {handleChange}
            onBlur = {handleChange}
          />
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label
          htmlFor="quantity"
          className="mt-6 block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={rows.quantity}
          className="mt-1 p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder=""
          onChange = {handleChange}
          onBlur = {handleChange}
        />
      </div>

      {/* Next/Previous Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={onPrevious}
          className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );

  export default ProductPricing