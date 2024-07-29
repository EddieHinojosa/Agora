import { Link } from 'react-router-dom';


// needs to be updated to pull from the db schema
const ProductCard = ({ id, image, name, stock, price }) => {
    return (
        <Link to={`/product/${id}`} className="card border border-gray-300 overflow-hidden">
            <img src={image} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-md font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-gray-600">Stock: {stock}</p>
                <p className="mt-1 text-gray-600 text-sm">${price}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
