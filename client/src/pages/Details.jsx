import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.MODE === 'production' 
            ? import.meta.env.VITE_PROD_API_URL 
            : import.meta.env.VITE_DEV_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
        setMainImage(response.data.image_urls[0]);
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
    <div className="flex flex-col md:flex-row items-start mt-6 pl-20 pr-20">
      <div className="w-full md:w-1/2 flex flex-col items-center ml-6">
        <img
          src={mainImage}
          alt={product.productName}
          className="w-full h-auto mb-4"
        />
        <div className="flex space-x-2">
          {product.image_urls.slice(0, ).map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              className="w-32 h-32 cursor-pointer object-cover"
              onClick={() => setMainImage(imageUrl)}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6">
        <h2 className="text-2xl font-bold">{product.productName}</h2>
        <p className="text-xl text-gray-700 mt-2">${product.price}</p>
        <p className="text-md text-gray-500 mt-2">{product.user?.shopName || 'shop'}</p>
      </div>
    </div>
  );
};

export default ProductDetails;

