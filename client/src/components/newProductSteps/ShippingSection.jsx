import React, { useState } from "react";
import axios from "axios";

// Shipping Section
const ShippingSection = ({ rows, handleChange }) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const addresses = [
    "123 Main, Atlanta, GA 12345",
    "456 Marty St, Atlanta, GA, 12345",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_API_URL}` + `api/shopmanager/newproduct` ||`${import.meta.env.VITE_PROD_API_URL}` + `api/shopManager/newProduct`  ,
        rows
      );

      console.log("Poop submitted:", response);
    } catch (error) {
      console.error("Error submitting poop:", error);
    }
  };

  return (
    <div>
      {/* Shipping Address */}
      <div>
        <label
          htmlFor="shippingAddress"
          className="mt-14 block text-sm font-medium text-gray-700"
        >
          Shipping Address
        </label>
        <div className="flex items-center mt-1">
          <select
            id="shippingAddress"
            name="shippingAddress"
            value={selectedAddress}
            onChange={(e) => {
              setSelectedAddress(e.target.value);
              handleChange(e);
            }}
            className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {addresses.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Item Weight */}
      <div>
        <label
          htmlFor="productWeight"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Item Weight
        </label>
        <div className="flex items-center mt-1">
          <input
            type="number"
            id="packedWeight"
            name="packedWeight"
            value={rows.packedWeight}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
          />
          <select
            className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="packedWeightUnit"
            value={rows.packedWeightUnit}
            onChange={handleChange}
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
            <option value="g">g</option>
            <option value="oz">oz</option>
          </select>
        </div>
      </div>

      {/* Item Dimensions When Packed */}
      <div>
        <label
          htmlFor="packedLength"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Packed Length
        </label>
        <div className="flex items-center mt-1">
          <input
            type="number"
            id="packedLength"
            name="packedLength"
            value={rows.packedLength}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
            step="0.01"
            min="0"
          />
          <select
            className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="packedLengthUnit"
            value={rows.packedLengthUnit}
            onChange={handleChange}
          >
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="packedWidth"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Packed Width
        </label>
        <div className="flex items-center mt-1">
          <input
            type="number"
            id="packedWidth"
            name="packedWidth"
            value={rows.packedWidth}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
            step="0.01"
            min="0"
          />
          <select
            className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="packedWidthUnit"
            value={rows.packedWidthUnit}
            onChange={handleChange}
          >
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="packedHeight"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Packed Height
        </label>
        <div className="flex items-center mt-1">
          <input
            type="number"
            id="packedHeight"
            name="packedHeight"
            value={rows.packedHeight}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
            step="0.01"
            min="0"
          />
          <select
            className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="packedHeightUnit"
            value={rows.packedHeightUnit}
            onChange={handleChange}
          >
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="processingTime"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Processing Time
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="processingTime"
            name="processingTime"
            value={rows.processingTime}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
            step="0.01"
            min="0"
          />
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          to="/shopmanager/products"
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default ShippingSection;
