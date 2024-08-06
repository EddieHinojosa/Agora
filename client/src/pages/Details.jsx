import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.MODE === 'production' 
            ? import.meta.env.VITE_PROD_API_URL 
            : import.meta.env.VITE_DEV_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>The next available agent will be with you shortly.</div>;
  }

  return (
    <div>
      <h2>{product.productName}</h2>
      <img src={product.image_urls[0]} alt={product.name} />
      <p>{product.price}</p>
      <p>{product.user?.shopName || 'shop'}</p>
    </div>
  );
};

export default ProductDetails;

