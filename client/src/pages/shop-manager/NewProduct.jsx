import { useState } from 'react'
import ProductInfo from '../../components/newProductSteps/ProductInfo'
import ProductType from '../../components/newProductSteps/ProductType'
import ProductImages from '../../components/newProductSteps/ProductImages'
import ProductPricing from '../../components/newProductSteps/ProductPricing'
import ProductOptions from '../../components/newProductSteps/ProductOptions'
import ProductDimensions from '../../components/newProductSteps/ProductDimensions'
import ShippingSection from '../../components/newProductSteps/ShippingSection'
// import ProductTable from '../../components/newProductSteps/ProductTable'


const NewProduct = () => {
    
const [rows, setRows] = useState(
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

    packedWeight: "",
    packedWeightUnit: "",
    
    productName: "",

    processingTime: "",
  
    price: "",
    status: "",
    size: "",
    tags: [],
    quantity: "",
  },
);

const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedRows = {...rows};
    console.log(updatedRows)
    console.log(name)
    updatedRows[name] = value;
    setRows(updatedRows);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_DEV_API_URL}` + `api/shopManager/newProduct`,
  //       rows
  //     );

  //     console.log("Poop submitted:", response);
  //   } catch (error) {
  //     // console.error("Error submitting poop:", error);
  //   }
  // };

  const steps = [
    <ProductInfo key="productInfo" rows={rows} handleChange={handleChange} />,
    <ProductType key="productType" rows={rows} handleChange={handleChange} setRows={setRows} />,
    <ProductImages key="productImages" rows={rows} setRows={setRows} handleChange={handleChange} />,
    <ProductPricing key="productPricing" rows={rows} handleChange={handleChange} />,
    <ProductOptions key="productOptions" rows={rows} handleChange={handleChange} setRows={setRows} />,
    <ProductDimensions key="productDimensions" rows={rows} handleChange={handleChange} />,
    <ShippingSection key="shippingSection" rows={rows} handleChange={handleChange} />,
    // <ProductTable rows={rows} handleChange={handleChange} key="productTable" />,
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
    <div className="flex flex-col">
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