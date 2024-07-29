import { Link } from 'react-router-dom';
import { FaLink } from "react-icons/fa";

// Dynamic Status Cards - will pull information from DB
const StatusCard = ({ status, count }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 w-1/3 mx-2">
      <div className="flex justify-center">
        <span className="text-sm font-medium text-center">{status}</span>
      </div>
      <div className="text-center mt-4">
        <span className="text-3xl font-bold">{count}</span>
      </div>
    </div>
  );
};

const ShopManager = () => {
  return (
    <>
      <div className='justify-center text-center'>
        <h2 className='text-4xl'>Hello (shopname)!</h2>
        <Link to="#" className='flex items-center justify-center space-x-2 hover:underline'>
          <FaLink />
          <span>Shop Link</span>
        </Link>
      </div>
      <div className="flex justify-center mt-8">
        <StatusCard status="Active" count={10} />
        <StatusCard status="Inactive" count={5} />
        <StatusCard status="Sold Out" count={0} />
      </div>
    </>
  );
};

export default ShopManager;
