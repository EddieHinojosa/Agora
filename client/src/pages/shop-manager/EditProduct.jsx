import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import ProductInfo from '../../components/ShopManager/Products/newProductSteps/ProductInfo';

import ProductPricing from '../../components/ShopManager/Products/newProductSteps/ProductPricing';

import ProductDimensions from '../../components/ShopManager/Products/newProductSteps/ProductDimensions';
import axios from 'axios';
import ShippingSection from '../../components/ShopManager/Products/newProductSteps/ShippingSection';

// Imports for future development

// import ProductType from '../../components/ShopManager/Products/newProductSteps/ProductType';
// import ProductImages from '../../components/ShopManager/Products/newProductSteps/ProductImages';
// import ProductOptions from '../../components/ShopManager/Products/newProductSteps/ProductOptions';


const EditProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();


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


   
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.MODE === 'production' 
            ? import.meta.env.VITE_PROD_API_URL 
            : import.meta.env.VITE_DEV_API_URL}/api/products/${id}
            `
        );

        setRows(response.data);
        console.log("Product fetched:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (id) {
    fetchProduct();
    }
  }, [id]);

  const handleChange = (event) => {

    const { name, value } = event.target;
    const updatedRows = {...rows};
    console.log(updatedRows)
    console.log(name)
    updatedRows[name] = value;
    setRows(updatedRows);
    console.log(rows)

  };
  
  const handleEditSubmit = async (e) => {  
    console.log('inside handleEditSubmit')
    
    try {
    const updatedRows = {...rows};


    updatedRows.user = user._id;
    updatedRows.shopName = user.shopName;
    console.log(updatedRows.user)
    setRows(updatedRows)

    
      const response = await axios.put( 
        `${import.meta.env.MODE === 'production' 
          ? import.meta.env.VITE_PROD_API_URL 
          : import.meta.env.VITE_DEV_API_URL}/shopmanager/${user._id}/editproduct/${id}`,
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
   
    <ProductPricing key="productPricing" rows={rows} handleChange={handleChange} />,
    
    <ProductDimensions key="productDimensions" rows={rows} handleChange={handleChange} />,
    <ShippingSection key="shippingSection" rows={rows} handleChange={handleChange} handleEditSubmit={handleEditSubmit} />,

 // components for future development

  // <ProductType key="productType" rows={rows} setRows={setRows} tags={tags} setTags={setTags} handleChange={handleChange}  />,
  // <ProductOptions key="productOptions" rows={rows} setRows={setRows} handleChange={handleChange} optionRows={optionRows} setOptionRows={setOptionRows} />,  
  // <ProductImages key="productImages" rows={rows} setRows={setRows} images={images} setImages={setImages} handleChange={handleChange} />,
  // <ProductTable key="productTable"  rows={rows} handleChange={handleChange} handleSubmit={handleSubmit}  />,
  ];


  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      <div className="mt-4">
        <form onSubmit={handleEditSubmit}>
        {steps.map((StepComponent, index) => (
          <div key={index} className="mb-6">
            {StepComponent}
          </div>
        ))}
      </form>
      </div>
    </div>
  );
};

export default EditProduct;

//State change functions for future development

  // /// Product Options State
  // const [optionRows, setOptionRows] = useState([
  //   { 
  //     option: "", 
  //     values: [], 
  //     newValue: "" 
  //   },
  // ]);
  // /// Tags State
  // const [tags, setTags] = useState([]);
  
  // /// Images State
  // const [images, setImages] = useState([]);