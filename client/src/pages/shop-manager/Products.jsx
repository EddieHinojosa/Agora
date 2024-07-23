import { IoIosAddCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";

const Products = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <span className="text-2xl font-bold">Products</span>
                <Link to='/shopmanager/newproduct' className="ml-auto text-l flex items-center border border-gray-300 rounded-lg px-4 py-2">
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
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <IoMdSearch className="text-gray-500" />
                        </span>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Search..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;