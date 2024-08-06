import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

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
    <div className="min-h-screen flex flex-col md:flex-row items-start mt-6 pl-6 pr-6 md:pl-24 md:pr-20">
    <div className="w-full md:w-1/2 flex flex-col items-center md:ml-6">
      <img
        src={mainImage}
        alt={product.productName}
        className="w-full h-auto mb-4"
      />
      {product.image_urls.length > 1 && (
      <div className="flex space-x-2 md:space-x-2 md:flex-row flex-wrap justify-center">
        {product.image_urls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Thumbnail ${index + 1}`}
            className="w-16 h-16 md:w-32 md:h-32 cursor-pointer object-cover mb-2"
            onClick={() => setMainImage(imageUrl)}
          />
        ))}
      </div>
      )}
    </div>
    <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6 flex flex-col justify-start">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{product.productName}</h2>
        <p className="text-xl text-gray-700 mt-2">${product.price}</p>
        <p className="text-lg text-gray-700 mt-2">{product.productDetails}</p>
        <p className="text-md text-gray-500 mt-2">{product.user?.shopName || 'shop'}</p>

        {/* Size Dropdowns */}
        {product.sizeOptions && (
            <div className="mt-4">
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size:</label>
              <select
                id="size"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select a size</option>
                {product.sizeOptions.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

        {/* Color Dropdowns */}
        {product.colorOptions && (
            <div className="mt-4">
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
              <select
                id="color"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Select a color</option>
                {product.colorOptions.map((color, index) => (
                  <option key={index} value={color}>{color}</option>
                ))}
              </select>
            </div>
          )}

        {/* Material Dropdowns */}
        {product.materialOptions && (
            <div className="mt-4">
              <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material:</label>
              <select
                id="material"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
              >
                <option value="">Select a material</option>
                {product.materialOptions.map((material, index) => (
                  <option key={index} value={material}>{material}</option>
                ))}
              </select>
            </div>
          )}

        <button
          className="mt-4 px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-300 hover:text-black"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  );
};

export default ProductDetails;

