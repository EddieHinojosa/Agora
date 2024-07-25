import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";

const Orders = () => {
    return (
        <div><div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">Orders</span>
        </div>
        <div className="flex justify-end">
            <div className="w-full bg-gray-100 flex p-1 space-x-4">
                <Link to="#" className="p-2 hover:underline">New</Link>
                <Link to="#" className="p-2 hover:underline">Completed</Link>
            </div>
        </div>
    </div></div>
    )
}

export default Orders