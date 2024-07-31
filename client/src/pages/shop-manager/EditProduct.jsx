import { useState } from 'react';
import ProductInfo from '../../components/newProductSteps/ProductInfo';
import ProductType from '../../components/newProductSteps/ProductType';
import ProductImages from '../../components/newProductSteps/ProductImages';
import ProductPricing from '../../components/newProductSteps/ProductPricing';
import ProductOptions from '../../components/newProductSteps/ProductOptions';
import ProductDimensions from '../../components/newProductSteps/ProductDimensions';
import ShippingSection from '../../components/newProductSteps/ShippingSection';
import ProductTable from '../../components/newProductSteps/ProductTable';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[0][name] = value;
    setRows(updatedRows);
  };

  const steps = [
    <ProductInfo key="productInfo" rows={rows} handleChange={handleChange} />,
    <ProductType key="productType" rows={rows} handleChange={handleChange} setRows={setRows} />,
    <ProductImages key="productImages" rows={rows} setRows={setRows} handleChange={handleChange} />,
    <ProductPricing key="productPricing" rows={rows} handleChange={handleChange} />,
    <ProductOptions key="productOptions" rows={rows} handleChange={handleChange} setRows={setRows} />,
    <ProductDimensions key="productDimensions" rows={rows} handleChange={handleChange} />,
    <ShippingSection key="shippingSection" rows={rows} handleChange={handleChange} />,
    <ProductTable key="productTable" />, 
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      <div className="mt-4">
        {steps.map((StepComponent, index) => (
          <div key={index} className="mb-6">
            {StepComponent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProduct;
