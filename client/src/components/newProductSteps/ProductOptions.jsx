import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

// Product Options Section
  const ProductOptions = ({ onNext, onPrevious, rows, onChange, setRows }) => {
    const [optionRows, setOptionRows] = useState([
      { 
        option: "", 
        values: [], 
        newValue: "" 
      },
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

          // State change logic below
          // console.log(updatedOptionRows)
          // console.log(updatedOptionRows[index].option)
          // console.log(updatedOptionRows[index].values[index])
        const stateRow = updatedOptionRows[index].option.toLowerCase()
        const stateRowValue = updatedOptionRows[index].values[updatedOptionRows[index].values.length - 1]
        const updatedRows = {...rows}
        updatedRows[stateRow] = stateRowValue
        setRows(updatedRows)
        console.log(updatedRows)
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

    const pushOptions = () => {
      
    }
    
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

  export default ProductOptions

//     {/* Next/Previous Buttons */}
//     <div className="flex space-x-4 mt-6">
//     <button
//       onClick={onPrevious}
//       className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//     >
//       Previous
//     </button>
//     <button
//       onClick={() => {
//         if (rows.values > 0) {
//           pushOptions()
//         } 
//         onNext();
//       }}
//       className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
//     >
//       Next
//     </button>
//   </div>
// </div>
// );
// };