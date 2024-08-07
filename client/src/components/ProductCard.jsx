import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

// needs to be updated to pull from the db schema
const ProductCard = ({ _id, product, image_urls, productName, quantity, price, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Delete function needs to be updated to delete from the db - deletes NOTHING right now
    const handleDelete = () => {
        onDelete(_id);
        setIsModalOpen(false);
    };
 
    return (
        <div className="relative card border border-gray-300 overflow-hidden rounded-lg">
            <Link to={`/shopmanager/user/${_id}/editproduct/${productName}`} className="block">
                <img src={image_urls[0]} alt={`No image available for ${productName}`} className="w-full h-48 object-cover"/>
                <div className="p-4">
                    <h3 className="text-md font-semibold">{productName}</h3>
                    <p className="mt-1 text-sm text-gray-600">Stock: {quantity}</p>
                    <p className="mt-1 text-gray-600 text-sm">{"$" + `${price}`}</p>
                </div>
            </Link>
            <div className="p-4 border-t border-gray-200 flex justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center text-black hover:text-red-500"
                >
                    <MdDelete className="mr-1" size={20} />
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirm</h2>
                        <p className="mb-4">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-black text-white hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
