 import React from "react";
 
 // Product Type Section
 const ProductType = ({ onNext, onPrevious }) => (
    <div className="w-full flex flex-col space-y-4">
      {/* Physical or Digital */}
      <div className="flex space-x-4">
        <div className="flex mt-5">
          <input
            type="checkbox"
            id="physicalItem"
            name="physicalItem"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="physicalItem"
            className="ml-2 block text-sm text-gray-700"
          >
            Physical Item
          </label>
        </div>
        <div className="flex mt-5">
          <input
            type="checkbox"
            id="digitalItem"
            name="digitalItem"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="digitalItem"
            className="ml-2 block text-sm text-gray-700"
          >
            Digital Item
          </label>
        </div>
      </div>

      {/* Product Type */}
      <div>
        <label
          htmlFor="productType"
          className="block text-sm font-medium text-gray-700"
        >
          Product Type
        </label>
        <input
          type="text"
          id="productType"
          name="productType"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter product type"
        />
      </div>

      {/* Item Tags */}
      <div>
        <label
          htmlFor="itemTags"
          className="block text-sm font-medium text-gray-700"
        >
          Item Tags
        </label>
        <input
          type="text"
          id="itemTags"
          name="itemTags"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter item tags"
        />
      </div>

      {/* Next/Previous Buttons */}
      <div className="flex space-x-4">
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

  export default ProductType