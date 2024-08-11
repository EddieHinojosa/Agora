import { useContext, useEffect, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import ProductCard from '../../components/ShopManager/Products/ProductCard';
import { AuthContext } from '../../context/AuthContext';
import UserData from '../../components/ShopManager/Main/UserData';


const Products = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    
    const onDelete = async (_id) => {
        try { 
            const response = await axios.delete(
                `${import.meta.env.MODE === 'production' 
                      ? import.meta.env.VITE_PROD_API_URL 
                      : import.meta.env.VITE_DEV_API_URL}/shopmanager/${user._id}/products/${_id}
                      `
            )
            setProducts(products.filter(product => product._id !== _id));
            console.log('Success!', response)
        } catch (error) {
            console.log("Error Deleting Product:", error)
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.MODE === 'production' 
                      ? import.meta.env.VITE_PROD_API_URL 
                      : import.meta.env.VITE_DEV_API_URL}/shopmanager/${id}/products
                      `
                );
                setProducts(response.data);
                console.log("Products fetched:", response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        if (id) {
        fetchProducts();
        }
   //// deleting line 45 creates an endless loop that withh result in error code 429
    }, [id]);

    if (!user || !user._id) {
        return <div>Plays Jeopardy Theme Song..</div>;
    }

    return (
        <div className="min-h-screen container mx-auto p-4">
            <div className="flex items-center mb-4">
                <h2 className="text-2xl">Products</h2>
                <Link to={`/shopmanager/${user._id}/newproduct`} className="ml-auto text-l flex items-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-black hover:text-white">
                    <IoIosAddCircle className="mr-2 text-xl" /> Add A Product
                </Link>
            </div>
            <div className="flex justify-end">
                <div className="w-full bg-gray-100 flex p-1 space-x-4">
                    <Link to="#" className="p-2 hover:underline">All</Link>
                    <Link to="#" className="p-2 hover:underline">Active</Link>
                    <Link to="#" className="p-2 hover:underline">Inactive</Link>
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <div className="w-full flex p-1 space-x-4 items-center">
                    <button className="p-2 hover:underline border border-gray-300 rounded-md">Sort A-Z</button>
                    <div className="relative flex-grow">
                        <button className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <IoMdSearch className="text-gray-500 hover:text-black" />
                        </button>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                            placeholder="Search..."
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {products.map(product => (
                    <ProductCard key={products.userId} {...product} onDelete={onDelete} />
                ))}
            </div>
        </div>
    )
}

export default Products;
