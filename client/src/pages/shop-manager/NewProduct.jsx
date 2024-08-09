import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import ProductInfo from '../../components/newProductSteps/ProductInfo'
import ProductType from '../../components/newProductSteps/ProductType'
import ProductImages from '../../components/newProductSteps/ProductImages'
import ProductPricing from '../../components/newProductSteps/ProductPricing'
import ProductOptions from '../../components/newProductSteps/ProductOptions'
import ProductDimensions from '../../components/newProductSteps/ProductDimensions'
import ShippingSection from '../../components/newProductSteps/ShippingSection'
import axios from 'axios'


// import ProductTable from '../../components/newProductSteps/ProductTable'


const NewProduct = () => {
const navigate = useNavigate();
const { user } = useContext(AuthContext);
    
/// Product State, this is what will be sent to the server
const [rows, setRows] = useState(
  {
    category: "",
    color: [],
    image_urls: [],
    material: [],
    
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

    packedWeight: "",
    packedWeightUnit: "",
    
    productName: "",

    processingTime: "",
  
    price: "",
    scent: [],
    shopName: "",
    shippingAddress: "",
    size: [],
    status: "",
    style: [],
    
    tags: [],
    user: "",
    quantity: "",
  },
);
/// Product Options State
const [optionRows, setOptionRows] = useState([
  { 
    option: "", 
    values: [], 
    newValue: "" 
  },
]);
/// Tags State
const [tags, setTags] = useState([]);

/// Images State
const [images, setImages] = useState([]);

const [currentStep, setCurrentStep] = useState(0);


  const handleChange = (event) => {

    const { name, value } = event.target;
    const updatedRows = {...rows};
    console.log(updatedRows)
    console.log(name)
    updatedRows[name] = value;
    setRows(updatedRows);
  };


  const handleSubmit = async (e) => {
  
    
    try {
    const updatedRows = {...rows};


    updatedRows.user = user._id;
    updatedRows.shopName = user.shopName;
    console.log(updatedRows.user)
    setRows(updatedRows)

    
      const response = await axios.post( 
        `${import.meta.env.MODE === 'production' 
          ? import.meta.env.VITE_PROD_API_URL 
          : import.meta.env.VITE_DEV_API_URL}/shopmanager/${user._id}/newproduct`,
        updatedRows
      );

      console.log("Product submitted:", response);
      navigate(`/shopmanager/${user._id}/products`)
    } catch (error) {
      console.error("Error submitting Product:", error);
    }
  };

  const steps = [
    <ProductInfo key="productInfo" rows={rows} handleChange={handleChange} />,
    <ProductType key="productType" rows={rows} setRows={setRows} tags={tags} setTags={setTags} handleChange={handleChange}  />,
    <ProductImages key="productImages" rows={rows} setRows={setRows} images={images} setImages={setImages} handleChange={handleChange} />,
    <ProductPricing key="productPricing" rows={rows} handleChange={handleChange} />,
    <ProductOptions key="productOptions" rows={rows} setRows={setRows} handleChange={handleChange} optionRows={optionRows} setOptionRows={setOptionRows} />,
    <ProductDimensions key="productDimensions" rows={rows} handleChange={handleChange} />,
    <ShippingSection key="shippingSection" rows={rows} handleChange={handleChange} handleSubmit={handleSubmit} />,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold">New Product</h2>
      <div className="mt-4">{steps[currentStep]}</div>
      <div className="flex justify-start mt-4 space-x-4">
        {currentStep !== 0 && (
          <button
            onClick={handlePrevious}
            className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        {currentStep !== steps.length - 1 && (
          <button
            onClick={handleNext}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default NewProduct