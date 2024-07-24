import { useState } from "react";
import { MdUpload, MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { GrHide } from "react-icons/gr";



const NewProduct = () => {

  // This code will probably have to change to sync up to DB - just wrote for table test
  const [rows, setRows] = useState([
    {
      photo: "",
      status: "",
      size: "S",
      color: "Pink",
      cost: "20",
      quantity: "100",
      weight: "5",
      length: "10",
      width: "15",
      height: "20",
    },
  ]);

  // Modal Code
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionRows, setOptionRows] = useState([{ option: "", values: [], newValue: "" }]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        photo: "",
        status: "",
        size: "S",
        color: "Green",
        cost: "20",
        quantity: "100",
        weight: "5",
        length: "10",
        width: "15",
        height: "20",
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
    // Input Photo code in here for possible change to specific uploaded photo?
    console.log("Card clicked", index);
  };
  //   End table test code

  // Modal Code
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOptionChange = (index, event) => {
    const updatedOptionRows = [...optionRows];
    updatedOptionRows[index][event.target.name] = event.target.value;
    setOptionRows(updatedOptionRows);
  };

  const handleNewValueChange = (index, event) => {
    const updatedOptionRows = [...optionRows];
    updatedOptionRows[index].newValue = event.target.value;
    setOptionRows(updatedOptionRows);
  };

  const addOptionValue = (index) => {
    const updatedOptionRows = [...optionRows];
    if (updatedOptionRows[index].newValue.trim() !== "") {
      updatedOptionRows[index].values.push(updatedOptionRows[index].newValue);
      updatedOptionRows[index].newValue = "";
      setOptionRows(updatedOptionRows);
    }
  };

  const deleteOptionValue = (optionIndex, valueIndex) => {
    const updatedOptionRows = [...optionRows];
    updatedOptionRows[optionIndex].values.splice(valueIndex, 1);
    setOptionRows(updatedOptionRows);
  };

  const addOptionRow = () => {
    setOptionRows([...optionRows, { option: "", values: [], newValue: "" }]);
  };

  const deleteOptionRow = (index) => {
    const updatedOptionRows = optionRows.filter((_, i) => i !== index);
    setOptionRows(updatedOptionRows);
  };
  // End Modal Code

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
        <div className="w-1/2 flex flex-col space-y-4">
          {/* Product Type Area */}
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
        </div>
      </div>

      {/* Devon, Image Area! */}
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
            className="p-2 block w-1/4 pl-7 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="0.00"
          />
        </div>
      </div>

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
          className="mt-1 p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder=""
        />
      </div>

      {/* Options Button */}
      <div className="mt-6">
        <button
          onClick={handleModalOpen}
          className="py-2 px-4 w-1/4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Options
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Product Options</h2>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Option
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Option Values
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {optionRows.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 align-top">
                      <select
                        name="option"
                        value={row.option}
                        onChange={(e) => handleOptionChange(index, e)}
                        className="w-full p-2 rounded bg-white border"
                      >
                        <option value="">Select Option</option>
                        <option value="Size">Size</option>
                        <option value="Color">Color</option>
                        <option value="Material">Material</option>
                        <option value="Scent">Scent</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex">
                          <input
                            type="text"
                            name="value"
                            value={row.newValue}
                            onChange={(e) => handleNewValueChange(index, e)}
                            className="w-full p-2 rounded border"
                          />
                          <button
                            onClick={() => addOptionValue(index)}
                            className="ml-2 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center space-x-2 mt-2">
                          {row.values.map((value, valueIndex) => (
                            <div
                              key={valueIndex}
                              className="flex items-center px-2 py-1 bg-gray-200 rounded-md space-x-2"
                            >
                              <span>{value}</span>
                              <button
                                onClick={() => deleteOptionValue(index, valueIndex)}
                                className="text-black"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <button
                        onClick={() => deleteOptionRow(index)}
                        className="px-4 py-2 mt-1 rounded hover:bg-gray-300"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between">
              <button
                onClick={addOptionRow}
                className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
              >
                <IoIosAdd />
              </button>
              <button
                onClick={handleModalClose}
                className="py-2 px-4 bg-black text-white text-sm rounded-md hover:bg-gray-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If time-going to work on incorporating this with modal to input into table below from modal answers -Clarissa */}
      {/* Multiple Options  */}
      {/* <div className="mt-20">
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

                  {/* Devon, feel free to change photo code tp fit however you've done it!*/}
                  {/* Photo Row - has click in case you want to incorporate*/}
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

                {/* Status Row Option */}
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


                {/* Inputed information to go in here - currently hard coded*/}
                <td className="px-6 py-4">{row.size}</td>
                <td className="px-6 py-4">{row.color}</td>
                <td className="px-6 py-4">{row.cost}</td>
                <td className="px-6 py-4">{row.quantity}</td>
                <td className="px-6 py-4">{row.weight}</td>
                <td className="px-6 py-4">{row.length}</td>
                <td className="px-6 py-4">{row.width}</td>
                <td className="px-6 py-4">{row.height}</td>

                {/* Sticky Action Buttons */}
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
      </div>
    </div>
  );
};

export default NewProduct;

