import React, { useState } from "react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
// import { GrHide } from "react-icons/gr";
import { Link } from "react-router-dom";
 
 // Product Table Section
 const ProductTable = () => {
    const [rows, setRows] = useState([
        {
          category: "",
          color: "",
          image_urls: [],
          material: "",
          
          packedLength: "",
          packedLengthUnit: "",
          
          packedWidth: "",
          packedWidthUnit: "",
      
          packedHeight: "",
          packedHeightUnit: "",
      
          productHeight: "",
          productHeightUnit: "",
      
          productLength: "",
          productLengthUnit: "",
      
          productWidth: "",
          productWidthUnit: "",
      
          productWeight: "",
          productWeightUnit: "",
          
          productName: "",

          processingTime: "",
        
          price: "",
          status: "",
          size: "",
          tags: [],
          quantity: "",
        
        },
      ]);
    
      const addRow = () => {
        setRows([
          ...rows,
          {
            category: "",
            color: "",
            image_urls: [],
            material: "",
            
            packedLength: "",
            packedLengthUnit: "",
            
            packedWidth: "",
            packedWidthUnit: "",
        
            packedHeight: "",
            packedHeightUnit: "",
        
            productHeight: "",
            productHeightUnit: "",
        
            productLength: "",
            productLengthUnit: "",
        
            productWidth: "",
            productWidthUnit: "",
        
            productWeight: "",
            productWeightUnit: "",
            
            productName: "",
          
            price: "",
            status: "",
            size: "",
            tags: [],
            quantity: "",
          
          },
        ]);
      };

      const uploadProduct = async (data) => {
        try{
        const response = await axios.post("http://localhost:5000/shopManager/newProduct", "https://agora-crafts.onrender.com/newProduct", data)
         console.log(response);
         navigate('/');
        } catch (error) {
          if (error.response) {
            alert("Product failed to create:"+ error.response.data)
          } else {
            alert('product created!:');
            } 
          }
          body: JSON.stringify(rows)
        }
        
    
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedRows = [...rows];
        console.log(updatedRows)
        console.log(name)
        updatedRows[0][name] = value;
        setRows(updatedRows);
      };
      
    
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
      return (
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
                {/* Devon, feel free to change photo code to fit however you've done it!*/}
                {/* Photo Row - has click in case you want to incorporate*/}
                <div
                  className="w-full p-4 bg-gray-100 shadow rounded cursor-pointer"
                  onClick={() => handleCardClick(index)}
                >
                  <img
                    src={rows.image_urls}
                    alt="Photo"
                    className="w-full h-auto rounded"
                  />
                </div>
              </td>
              <td className="py-4">
                <select
                  name="status"
                  value={row.status}
                  onChange={handleChange}
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
          type="submit"
          onClick={uploadProduct}
          to="/shopmanager/products"
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Publish
        </button>
      </div>
    </div>
  
  );
 };

  export default ProductTable