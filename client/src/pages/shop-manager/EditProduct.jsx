import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import ProductInfo from '../../components/newProductSteps/ProductInfo';
import ProductType from '../../components/newProductSteps/ProductType';
import ProductImages from '../../components/newProductSteps/ProductImages';
import ProductPricing from '../../components/newProductSteps/ProductPricing';
import ProductOptions from '../../components/newProductSteps/ProductOptions';
import ProductDimensions from '../../components/newProductSteps/ProductDimensions';
import axios from 'axios';
import ShippingSection from '../../components/newProductSteps/ShippingSection';




const EditProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  console.log(id)

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
    shopName: "",
    size: "",
    status: "",
    
    tags: [],
    user: "",
    quantity: "",
    }
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

    fetchProduct();
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
    e.preventDefault();    
    
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
      <ProductInfo key="productInfo" handleChange={handleChange} rows={rows} setRows={setRows} />,
      <ProductType key="productType" handleChange={handleChange} rows={rows}  setRows={setRows} />,
      // <ProductImages key="productImages" handleChange={handleChange} rows={rows} setRows={setRows} />,
      <ProductPricing key="productPricing" handleChange={handleChange} rows={rows} setRows={setRows} />,
      <ProductOptions key="productOptions"  handleChange={handleChange} rows={rows}  setRows={setRows} />,
      <ProductDimensions key="productDimensions" handleChange={handleChange} rows={rows} setRows={setRows} />,
      <ShippingSection key="shippingSection" handleEditSubmit={handleEditSubmit} handleChange={handleChange} rows={rows} setRows={setRows} />,
      // <ProductTable key="productTable"  rows={rows} handleChange={handleChange} handleSubmit={handleSubmit}  />,
    ];

  return (
    <div className="min-h-screen flex flex-col">
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
