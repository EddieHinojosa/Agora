import React, { useState } from "react";

// Product Type Section
const ProductType = ({ onNext, onPrevious, rows, handleChange }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagLimitReached, setTagLimitReached] = useState(false);
  const [itemType, setItemType] = useState("");

  // Add tag and limit
  const addTag = () => {
    if (tags.length < 10 && newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setTagLimitReached(false);
    } else if (tags.length >= 10) {
      setTagLimitReached(true);
    }
  };

  // Delete Tag
  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
    setTagLimitReached(false);
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Physical or Digital */}
      <div className="flex space-x-4">
        <div className="flex mt-5">
          <input
            type="radio"
            id="physicalItem"
            name="itemType"
            value="physical"
            checked={itemType === "physical"}
            onChange={(e) => setItemType(e.target.value)}
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
            type="radio"
            id="digitalItem"
            name="itemType"
            value="digital"
            checked={itemType === "digital"}
            onChange={(e) => setItemType(e.target.value)}
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
          id="category"
          name="category"
          value={rows.category}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter category"
          onChange={handleChange}
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
        <div className="flex">
          <input
            type="text"
            id="itemTags"
            name="itemTags"
            value={newTag}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter up to 10 item tags"
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            onClick={addTag}
            className="ml-2 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
          >
            Add
          </button>
        </div>
        {tagLimitReached && (
          <p className="text-red-500 text-sm mt-1">
            Oh no! You've reached the limit of 10 tags!
          </p>
        )}
        <div className="flex flex-wrap items-center space-x-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center px-2 py-1 bg-gray-200 rounded-md space-x-2"
            >
              <span>{tag}</span>
              <button onClick={() => deleteTag(index)} className="text-black">
                &times;
              </button>
            </div>
          ))}
        </div>
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
};

export default ProductType;
