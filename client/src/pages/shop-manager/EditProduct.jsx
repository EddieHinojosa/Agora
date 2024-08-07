import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import ProductInfo from '../../components/newProductSteps/ProductInfo';
import ProductType from '../../components/newProductSteps/ProductType';
import ProductImages from '../../components/newProductSteps/ProductImages';
import ProductPricing from '../../components/newProductSteps/ProductPricing';
import ProductOptions from '../../components/newProductSteps/ProductOptions';
import ProductDimensions from '../../components/newProductSteps/ProductDimensions';
import axios from 'axios';



const EditProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);

 
   
  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.MODE === 'production' 
                  ? import.meta.env.VITE_PROD_API_URL 
                  : import.meta.env.VITE_DEV_API_URL}/products/${product._id}
                  `
            );
            setRows(...response.data);
            console.log("Product fetched:", response.data);
            console.log(`Product Update Sent!`)
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    fetchProduct();
    //// deleting line 45 creates an endless loop that withh result in error code 429
     }, [user._id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();    
      
      try {
      const updatedRows = {...rows};
      console.log(updatedRows.user)
      setRows(updatedRows)
  
      
        const response = await axios.post( 
          `${import.meta.env.MODE === 'production' 
            ? import.meta.env.VITE_PROD_API_URL 
            : import.meta.env.VITE_DEV_API_URL}/shopmanager/user/${user._id}/editproduct/${rows._id}`,
          updatedRows
        );
  
        console.log("Product submitted:", response);
        navigate(`/shopmanager/user/${user._id}/products`)
      } catch (error) {
        console.error("Error submitting Product:", error);
      }
    };
  
    const steps = [
      <ProductInfo key="productInfo" rows={rows}  />,
      <ProductType key="productType" rows={rows}  setRows={setRows} />,
      <ProductImages key="productImages" rows={rows} setRows={setRows}  />,
      <ProductPricing key="productPricing" rows={rows}  />,
      <ProductOptions key="productOptions" rows={rows}  setRows={setRows} />,
      <ProductDimensions key="productDimensions" rows={rows}  />,
      
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
