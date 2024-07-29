import { IoIosAddCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import ProductCard from '../../components/ProductCard';

// Needs code to be dynamically replaced with actual data from DB
// Actual card component is in components folder
const products = [
    { id: 1, image: '', name: 'Product 1', stock: 0, price: 9.99 },
    { id: 2, image: '', name: 'Product 2', stock: 5, price: 19.99 },
    { id: 3, image: '', name: 'Product 3', stock: 10, price: 29.99 },
    { id: 4, image: '', name: 'Product 4', stock: 15, price: 39.99 },
    { id: 5, image: '', name: 'Product 5', stock: 20, price: 49.99 },
];

const Products = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <h2 className="text-2xl">Products</h2>
                <Link to='/shopmanager/newproduct' className="ml-auto text-l flex items-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-black hover:text-white">
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

            {/* Card Code -- Currently clickable but leads nowhere*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
}

export default Products;