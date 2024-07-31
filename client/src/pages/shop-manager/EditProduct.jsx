import { useState } from 'react'
import ProductInfo from '../../components/newProductSteps/ProductInfo'
import ProductType from '../../components/newProductSteps/ProductType'
import ProductImages from '../../components/newProductSteps/ProductImages'
import ProductPricing from '../../components/newProductSteps/ProductPricing'
import ProductOptions from '../../components/newProductSteps/ProductOptions'
import ProductDimensions from '../../components/newProductSteps/ProductDimensions'
import ShippingSection from '../../components/newProductSteps/ShippingSection'
import ProductTable from '../../components/newProductSteps/ProductTable'


const EditProduct = () => {
    
const [rows, setRows] = useState([
  {
    color: "",
    cost: "",
    height: "",
    material: "",
    packedLength: "",
    packedWidth: "",
    packedHeight: "",
    productLength: "",
    processingTime: "",
    price: "",
    status: "",
    size: "",
    photo: "",
    quantity: "",
    width: "",
    weight: ""
  },
]);

  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    console.log(updatedRows)
    console.log(name)
    updatedRows[0][name] = value;
    setRows(updatedRows);
  };

  const steps = [
    <ProductInfo key="productInfo" rows={rows} handleChange={handleChange} onNext={() => setCurrentStep(currentStep + 1)} />,
    <ProductType key="productType" onNext={() => setCurrentStep(currentStep + 1)} onPrevious={() => setCurrentStep(currentStep - 1)} />,
    <ProductImages key="productImages" onNext={() => setCurrentStep(currentStep + 1)} onPrevious={() => setCurrentStep(currentStep - 1)} />,
    <ProductPricing key="productPricing" rows={rows} handleChange={handleChange} onNext={() => setCurrentStep(currentStep + 1)} onPrevious={() => setCurrentStep(currentStep - 1)} />,
    <ProductOptions key="productOptions" onNext={() => setCurrentStep(currentStep + 1)} onPrevious={() => setCurrentStep(currentStep - 1)} />,
    <ProductDimensions key="productDimensions" rows={rows} handleChange={handleChange} onNext={() => setCurrentStep(currentStep + 1)} onPrevious={() => setCurrentStep(currentStep - 1)} />,
    <ShippingSection key="shippingSection" rows={rows} handleChange={handleChange} onNext={() => setCurrentStep(currentStep + 1)} onPrevious={() => setCurrentStep(currentStep - 1)} />,
    <ProductTable key="productTable" onPrevious={() => setCurrentStep(currentStep - 1)} />,
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">New Product</h2>
      <div className="mt-4">{steps[currentStep]}</div>
    </div>
  )

}

export default EditProduct