import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import axios from "axios";
import slug from 'slug';
import BackButton from '../components/Home/Backbutton';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedScent, setSelectedScent] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showAbout, setShowAbout] = useState(false);
  const [showSpec, setSpec] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.MODE === "production"
              ? import.meta.env.VITE_PROD_API_URL
              : import.meta.env.VITE_DEV_API_URL
          }/api/products/${id}`
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

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, selectedMaterial, selectedScent,selectedQuantity, mainImage);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start mt-6 pl-6 pr-6 md:pl-24 md:pr-20">
      <div className='p-4'><BackButton /></div>
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
          <p className="text-md text-gray-700 mt-2">In Stock: {product.quantity}</p>
          <p className="text-lg w-1/2 text-gray-700 mt-2">{product.tags && product.tags.length > 0 && <p>{product.tags.join(', ')}</p>}</p>
          <div className='mt-4'>
          <Link to={`/shop/${slug(product.shopName) || "shop"}`} className="text-sm rounded-md text-gray-700 hover:bg-gray-300 hover:text-black hover:p-2">
            {product.shopName || "shop"} 
          </Link>
          </div>



          {/* Size Dropdowns */}
          {product.size && product.size.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size:
              </label>
              <select
                id="size"
                className="mt-1 block w-full md:w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select a size</option>
                {product.size.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Color Dropdowns */}
          {product.color && product.color.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Color:
              </label>
              <select
                id="color"
                className="mt-1 block w-full md:w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Select a color</option>
                {product.color.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Material Dropdowns */}
          {product.material && product.material.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700"
              >
                Material:
              </label>
              <select
                id="material"
                className="mt-1 block w-full md:w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
              >
                <option value="">Select a material</option>
                {product.material.map((material, index) => (
                  <option key={index} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Style Dropdown */}
          {product.style && product.style.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor="style"
                className="block text-sm font-medium text-gray-700"
              >
                Style:
              </label>
              <select
                id="style"
                className="mt-1 block w-full md:w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                <option value="">Select a style</option>
                {product.style.map((style, index) => (
                  <option key={index} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Scent Select */}
          {product.scent && product.scent.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor="scent"
                className="block text-sm font-medium text-gray-700"
              >
                Scent:
              </label>
              <select
                id="scent"
                className="mt-1 block w-full md:w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedScent}
                onChange={(e) => setSelectedScent(e.target.value)}
              >
                <option value="">Select a scent</option>
                {product.scent.map((scent, index) => (
                  <option key={index} value={scent}>
                    {scent}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Item Quantity Dropdown */}
            <div className="mt-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Item Quantity:
              </label>
              <select
                id="quantity"
                className="mt-1 block w-full md:w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-border-pink-500 focus:border-pink-500 sm:text-sm"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

          <button onClick={handleAddToCart} className="mt-4 px-4 py-2 w-full md:w-1/2  bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-300 hover:text-black">
            Add to Cart
          </button>


           {/* About the Product Section */}
          <div className="mt-6">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="text-xl font-bold flex items-center justify-between w-full md:w-1/2 "
            >
              About the Product
              <span>{showAbout ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}</span>
            </button>
            {showAbout && (
              <>
                  <p className="w-1/2 text-lg text-gray-700 mt-2">{product.productDetails}</p>
              
              </>
            )}
          </div>

          {/* Specifications Section */}
          <div className="mt-3">
            <button
              onClick={() => setSpec(!showSpec)}
              className="text-xl font-bold flex items-center justify-between w-full md:w-1/2 "
            >
              Specifications
              <span>{showSpec ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}</span>
            </button>
            {showSpec && (
              <>
                {product.aboutProduct && product.aboutProduct.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {product.aboutProduct.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                <ul className="list-disc list-inside mt-2 text-gray-700 text-md">
                  <li>Category: {product.category}</li>
                  {product.tags && product.tags.length > 0 && <li>Tags: {product.tags.join(', ')}</li>}
                  <li>Product Dimensions: {product.productLength} x {product.productWidth} x {product.productHeight}</li>
                  <li>Packed Dimensions: {product.packedLength} x {product.packedWidth} x {product.packedHeight}</li>
                  <li>Packed Weight: {product.packedWeight} lb</li>
                  <li>Processing Time: {product.processingTime}</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
