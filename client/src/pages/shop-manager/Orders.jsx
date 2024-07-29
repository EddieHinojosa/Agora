import { Link } from 'react-router-dom'

const Orders = () => {
    return (
        <div><div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
            <h2 className="text-2xl">Orders</h2>
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