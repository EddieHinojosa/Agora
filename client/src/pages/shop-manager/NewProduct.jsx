import { useState } from "react";
import { MdUpload, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
// import { GrHide } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ProductImages } from "../../components/newProductSteps/ProductImages";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget";

const NewProduct = () => {
  // For Next/Previous Sections
  const [currentStep, setCurrentStep] = useState(0);

  // This code will probably have to change to sync up to DB - just wrote for table test
  const [rows, setRows] = useState([
    {
      photo: "",
      status: "",
      size: "S",
      color: "Pink",
      cost: "20",
      quantity: "100",
      material: "rubber",
      weight: "5",
      length: "10",
      width: "15",
      height: "20",
    },
  ]);

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
        material: "plastic",
        weight: "5",
        length: "10",
        width: "15",
        height: "20",
      },
    ]);
  };

  const handleChange = (index, event) => {
    const updatedRows = [...rows];
    const { name, value } = event.target;
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };
    setRows(updatedRows);
  };

  // const handleHide = (index) => {
  //   const updatedRows = [...rows];
  //   updatedRows[index].hidden = !updatedRows[index].hidden;
  //   setRows(updatedRows);
  // };

  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleCardClick = (index) => {
    // Devon, Input Photo code in here for possible change to specific uploaded photo?
    console.log("Card clicked", index);
  };

  const toggleEdit = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].isEditing = !updatedRows[index].isEditing;
    setRows(updatedRows);
  };

  const saveChanges = (index) => {
    toggleEdit(index);
  };

  //   End table test code

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
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter product name"
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

  // Product Type Section
  const ProductType = () => {
    const [selectedCategory, setSelectedCategory] = useState('')

    return (
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

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="accessories">Accessories</option>
          <option value="art">Art</option>
          <option value="clothing">Clothing</option>
          <option value="homedecor">Collectible</option>
          <option value="tableware">Tableware</option>
          <option value="drinkware">Drinkware</option>
          <option value="jewelry">Jewelry</option>
          <option value="paper">Paper</option>
          <option value="novelty">Novelty</option>
          <option value="pets">Pets</option>
        </select>
      </div>
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
          onClick={() => setCurrentStep(currentStep - 1)}
          className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
  };


  function selectImages () {
    document.querySelector('[name = "img"]').click()
  }
   
  function uploadImages (event) {
console.log(event.currentTarget, event.currentTarget.files)
   }

  // // For Devon!
  // // Image Section
  // const ProductImages = () => (
  //   <div className="mt-6">
  //     <div className="mt-6 text-2xl font-bold">Images</div>
  //     <div className="mt-4 w-full flex space-x-4">
  //       <div className="w-1/4">
  //         <div className="text-xl font-bold">How to Upload</div>
  //         <p className="mt-2 text-sm text-gray-700">
  //           Please follow these steps to upload images:
  //         </p>
  //         <ol className="list-decimal ml-4 mt-2">
  //             <li>Step 1</li>
  //             <li>Step 2</li>
  //             <li>Step 3</li>
  //           </ol>
  //       </div>
  //       <div className="w-3/4 grid grid-cols-6">
  //         <div className="border bg-gray-200 rounded-md flex h-32 w-32">
  //           <CloudinaryUploadWidget/>
  //         </div>
  //         <div className="border border-gray-300 rounded-md h-32 w-32"></div>
  //         <div className="border border-gray-300 rounded-md h-32 w-32"></div>
  //         <div className="border border-gray-300 rounded-md h-32 w-32"></div>
  //         <div className="border border-gray-300 rounded-md h-32 w-32"></div>
  //         <div className="border border-gray-300 rounded-md h-32 w-32"></div>
  //       </div>
  //     </div>

  //     {/* Next/Previous Button */}
  //     <div className="flex space-x-4 mt-6">
  //       <button
  //         onClick={() => setCurrentStep(currentStep - 1)}
  //         className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
  //       >
  //         Previous
  //       </button>
  //       <button
  //         onClick={() => setCurrentStep(currentStep + 1)}
  //         className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
  //       >
  //         Next
  //       </button>
  //     </div>
  //   </div>
  // );


  // Product Price and Quantity Section
  const ProductPricing = () => (
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
            className="p-2 block w-1/4 pl-7 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="0.00"
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
          className="mt-1 p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder=""
        />
      </div>

      {/* Next/Previous Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Product Options Section
  const ProductOptions = () => {
    const [optionRows, setOptionRows] = useState([
      { option: "", values: [], newValue: "" },
    ]);

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

    return (
      // Option Table
      <div className="mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Product Options</h2>
          <table className="min-w-full divide-y divide-gray-200 mb-4">
            {/* Table Header */}
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

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {optionRows.map((row, index) => (
                <tr key={index}>
                  {/* Option Dropdown */}
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
                      <option value="Style">Style</option>
                      <option value="Scent">Scent</option>
                    </select>
                  </td>

                  {/* Option Value Input */}
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
                              onClick={() =>
                                deleteOptionValue(index, valueIndex)
                              }
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
          <div className="mt-4 flex justify-end">
            <button
              onClick={addOptionRow}
              className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
            >
              <IoIosAdd />
            </button>
            {/* <button
              onClick={() => console.log('Save')}
              className="py-2 px-4 bg-black text-white text-sm rounded-md hover:bg-gray-300"
            >
              Save
            </button> */}
          </div>
        </div>

        {/* Next/Previous Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  // Product Dimensions Section
  const ProductDimensions = () => (
    <div>
      {/* Length */}
      <div>
        <label
          htmlFor="length"
          className="mt-14 block text-sm font-medium text-gray-700"
        >
          Length
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="length"
            name="length"
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      {/* Width */}
      <div>
        <label
          htmlFor="width"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Width
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="width"
            name="width"
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      {/* Height */}
      <div>
        <label
          htmlFor="height"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Height
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="height"
            name="height"
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      {/* Would like to incorporate previous options size answers to this 
      so if they choose yes the size answers come up and you can add more sizes*/}
      {/* Multiple Options  */}
      <div className="mt-6">
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
      </div>

      {/* Next/Previous Buttons */}
      <div className="flex space-x-4 mt-10">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Shipping Section
  const ShippingSection = () => {

    // incorporate a fetch or something for the dropdown?

    const [showAddAddress, setShowAddAddress] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [addresses, setAddresses] = useState([

      // Hard Coded for now.
      '123 Main, Atlanta, GA 12345',
      '456 Marty St, Atlanta, GA, 12345',
    ]);
    const [selectedAddress, setSelectedAddress] = useState('');
  
    const handleAddAddressClick = () => {
      setShowAddAddress(true);
    };
  
    const handleSaveAddress = () => {
      if (address.trim() && city.trim() && state.trim() && zip.trim()) {
        const newAddress = `${address}, ${city}, ${state}, ${zip}`;
        setAddresses([...addresses, newAddress]);
        setSelectedAddress(newAddress);
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        setShowAddAddress(false);
      }
    };
  
    return (
      <div>
        {/* Shipping Address */}
        <div>
          <label htmlFor="shippingAddress" className="mt-14 block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <div className="flex items-center mt-1">
            <select
              id="shippingAddress"
              name="shippingAddress"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {addresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
            <button
              className="ml-2 p-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-300 sm:text-sm"
              onClick={handleAddAddressClick}
            >
              Add Address
            </button>
          </div>
          {showAddAddress && (
            <div className="mt-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="Address"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="City"
              />
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="State"
              />
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="Zip Code"
              />
              <button
                className="mt-4 p-2 w-2/6 bg-black text-white rounded-md shadow-sm hover:bg-gray-300 sm:text-sm"
                onClick={handleSaveAddress}
              >
                Save
              </button>
            </div>
          )}
        </div>
  
        {/* Item Weight */}
        <div>
          <label htmlFor="itemWeight" className="mt-4 block text-sm font-medium text-gray-700">
            Item Weight
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="itemWeight"
              name="itemWeight"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
            />
            <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="kg">kg</option>
              <option value="lb">lb</option>
              <option value="g">g</option>
              <option value="oz">oz</option>
            </select>
          </div>
        </div>
  
        {/* Item Dimensions When Packed */}
        <div>
          <label htmlFor="packedLength" className="mt-4 block text-sm font-medium text-gray-700">
            Packed Length
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="packedLength"
              name="packedLength"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
            />
            <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="mm">mm</option>
              <option value="ft">ft</option>
            </select>
          </div>
        </div>
  
        <div>
          <label htmlFor="packedWidth" className="mt-4 block text-sm font-medium text-gray-700">
            Packed Width
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="packedWidth"
              name="packedWidth"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
            />
            <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="mm">mm</option>
              <option value="ft">ft</option>
            </select>
          </div>
        </div>
  
        <div>
          <label htmlFor="processingTime" className="mt-4 block text-sm font-medium text-gray-700">
            Packed Height
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="processingTime"
              name="processingTime"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
            />
            <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="mm">mm</option>
              <option value="ft">ft</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="packedHeight" className="mt-4 block text-sm font-medium text-gray-700">
            Processing Time
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="processingTime"
              name="processingTime"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
            />
          </div>
        </div>
  
        {/* Next/Previous Buttons */}
        <div className="flex space-x-4 mt-10">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  // Product Table Section
  const ProductTable = () => (
    <div className="mt-20 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Head */}
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
              Material
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
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="size"
                    className="border border-gray-300 p-1"
                    value={row.size}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.size
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="color"
                    className="border border-gray-300 p-1"
                    value={row.color}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.color
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="cost"
                    className="border border-gray-300 p-1"
                    value={row.cost}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.cost
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="quantity"
                    className="border border-gray-300 p-1"
                    value={row.quantity}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.quantity
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="material"
                    className="border border-gray-300 p-1"
                    value={row.material}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.material
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="weight"
                    className="border border-gray-300 p-1"
                    value={row.weight}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.weight
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="length"
                    className="border border-gray-300 p-1"
                    value={row.length}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.length
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="width"
                    className="border border-gray-300 p-1"
                    value={row.width}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.width
                )}
              </td>
              <td className="px-6 py-4">
                {row.isEditing ? (
                  <input
                    name="height"
                    className="border border-gray-300 p-1"
                    value={row.height}
                    onChange={(e) => handleChange(index, e)}
                  />
                ) : (
                  row.height
                )}
              </td>
              <td className="px-6 py-4 sticky right-0 bg-gray-100">
                <div className="flex">
                  {/* <button
                    onClick={() => handleHide(index)}
                    className="relative px-4 py-2 rounded hover:bg-gray-300"
                  >
                    <GrHide />
                  </button> */}

                  {/* Incorporating  edit/save function*/}
                  {row.isEditing ? (
                    <button
                      onClick={() => saveChanges(index)}
                      className="px-4 py-2 rounded hover:bg-gray-300"
                    >
                      <MdSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleEdit(index)}
                      className="px-4 py-2 rounded hover:bg-gray-300"
                    >
                      <MdEdit />
                    </button>
                  )}
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
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <Link
          to="/shopmanager/products"
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Publish
        </Link>
      </div>
    </div>
  );

  const steps = [
    <ProductInfo key="productInfo" />,
    <ProductType key="productType" />,
    <ProductImages key="productImages" />,
    <ProductPricing key="productPricing" />,
    <ProductOptions key="productOptions" />,
    <ProductDimensions key="productDimensions" />,
    <ShippingSection key="ShippingSection" />,
    <ProductTable key="productTable" />,
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">New Product</h2>
      <div className="mt-4">{steps[currentStep]}</div>
    </div>
  );
};

export default NewProduct;
