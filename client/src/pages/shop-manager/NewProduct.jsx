import { useState } from "react";
import { MdUpload, MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { GrHide } from "react-icons/gr";


// This code will probably have to change to sync up to DB - just wrote for table test
const NewProduct = () => {
  const [rows, setRows] = useState([
    {
      photo: "",
      status: "",
      size: "",
      color: "",
      cost: "",
      quantity: "",
      weight: "",
      length: "",
      width: "",
      height: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        photo: "",
        status: "",
        size: "",
        color: "",
        cost: "",
        quantity: "",
        weight: "",
        length: "",
        width: "",
        height: "",
      },
    ]);
  };

  const handleChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index][event.target.name] = event.target.value;
    setRows(updatedRows);
  };

  const handleHide = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].hidden = !updatedRows[index].hidden;
    setRows(updatedRows);
  };

  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleCardClick = (index) => {
    // Input Photo code in here?
    console.log("Card clicked", index);
  };

//   End table test code

  return (
    <div className="flex flex-col">
      <div className="text-xl font-bold">New Product</div>
      <div className="mt-4 flex space-x-4 w-full">
        <div className="w-1/2 flex flex-col space-y-4">
       
         {/* Product Name Area */}
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
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product name"
            />
          </div>
        
            {/* Product Detail Area */}
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
            />
          </div>
        </div>

        {/* Product Type Area */}
        <div className="w-1/2 flex flex-col space-y-4">
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
          <div className="flex space-x-4">
            <div className="flex mt-5">
              <input
                type="checkbox"
                id="physicalItem"
                name="physicalItem"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />

                {/* Physical or Digital */}
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
          <div>
            <label
              htmlFor="materials"
              className="block text-sm font-medium text-gray-700"
            >
              Materials
            </label>
            <input
              type="text"
              id="material"
              name="materials"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Materials, Ingredients, etc."
            />
          </div>
        </div>
      </div>

      {/* Image Area */}
      <div className="mt-6 text-2xl font-bold">Images</div>
      <div className="mt-4 w-full flex space-x-4">
        <div className="w-1/4">
          <div className="text-xl font-bold">How to Upload</div>
          <p className="mt-2 text-sm text-gray-700">
            Please follow these steps to upload images:
            <ol className="list-decimal ml-4 mt-2">
              <li>Step 1</li>
              <li>Step 2</li>
              <li>Step 3</li>
            </ol>
          </p>
        </div>
        <div className="w-3/4 grid grid-cols-6">
          <div className="border bg-gray-200 rounded-md flex h-32 w-32">
            <button className="py-2 px-4 rounded-md hover:underline">
              Upload Image <MdUpload className="mx-auto mt-2" />
            </button>
          </div>
          <div className="border border-gray-300 rounded-md h-32 w-32"></div>
          <div className="border border-gray-300 rounded-md h-32 w-32"></div>
          <div className="border border-gray-300 rounded-md h-32 w-32"></div>
          <div className="border border-gray-300 rounded-md h-32 w-32"></div>
          <div className="border border-gray-300 rounded-md h-32 w-32"></div>
        </div>
      </div>
        {/* End Image Area */}


        {/* If time-going to work on incorporating this with modal to input into table below from modal answers -Clarissa */}
        {/* Multiple Options 
      <div className="mt-20">
        <span className="block text-sm font-medium text-gray-700">
          Does this come in multiple options?
        </span>
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="multipleSizesNo"
              name="multipleSizes"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="multipleSizesNo"
              className="ml-2 block text-sm text-gray-700"
            >
              No
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="multipleSizesYes"
              name="multipleSizes"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="multipleSizesYes"
              className="ml-2 block text-sm text-gray-700"
            >
              Yes
            </label>
          </div>
        </div>
      </div> */}



      {/* Table Area */}
      <div className="mt-20 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">

            {/* Table Header */}
          <thead className="bg-gray-100">
            <tr className="border">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Photo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Size
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Color
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cost
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Weight
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Length
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Width
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Height
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-100"
              >
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {rows.map((row, index) => (
              <tr key={index} className={row.hidden ? "hidden" : ""}>
                <td className="px-6 py-4">


                  {/* Devon, feel free to change photo code to fit however you've done it! */}
                  {/* Photo Row */}
                  <div
                    className="w-full p-4 bg-gray-100 shadow rounded cursor-pointer"
                    onClick={() => handleCardClick(index)}
                  >
                    <img
                      src={row.photo}
                      alt="Photo"
                      className="w-full h-auto rounded"
                    />
                  </div>
                </td>

                {/* Status Row Option*/}
                <td className="py-4">
                  <select
                    name="status"
                    value={row.status}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 rounded bg-white border"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="sold out">Sold Out</option>
                  </select>
                </td>

                {/* Size */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="size"
                    value={row.size}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>

                {/* Color */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="color"
                    value={row.color}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>

                {/* Cost */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="cost"
                    value={row.cost}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>

                {/* Quantity */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="quantity"
                    value={row.quantity}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>

                {/* Weight */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="weight"
                    value={row.weight}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>

                {/* length */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="length"
                    value={row.length}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="width"
                    value={row.width}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>

                {/* height */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="height"
                    value={row.height}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full"
                  />
                </td>

                {/* Actions */}
                <td className="px-6 py-4 sticky right-0 bg-gray-100">
                  <div className="flex">
                    <button
                      onClick={() => handleHide(index)}
                      className="relative px-4 py-2 rounded hover:bg-gray-300"
                    >
                      <GrHide />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-4 py-2 rounded hover:bg-gray-300"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={addRow}
                      className="px-4 py-2 rounded hover:bg-gray-300"
                    >
                      <IoIosAdd />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
        {/* Shipping Section here - Zip code, item size when boxed, etc. */}
      </div>
    </div>
  );
};

export default NewProduct;
