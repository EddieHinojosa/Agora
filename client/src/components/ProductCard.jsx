import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, name, stock, price }) => {
    return (
        <Link to={`/product/${id}`} className="card border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <img src={image} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-md font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">Stock: {stock}</p>
                <p className="text-gray-600 text-sm">${price}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
