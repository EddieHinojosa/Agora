import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaLink } from "react-icons/fa";
import UserData from '../../components/ShopManager/Main/UserData';


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
  const { id } = useParams(); 

  return (
    <UserData
      userId={id}
      render={(userData) => (
        <div>
          <div className='justify-center text-center'>
            <h2 className='text-4xl'>Hello {userData.shopName}!</h2>
            <Link to="#" className='flex items-center justify-center space-x-2 hover:underline'>
              <FaLink />
              <span>Shop Link</span>
            </Link>
          </div>
          <div className="flex justify-center mt-8">
            <StatusCard status="Active" count={20} />
            <StatusCard status="Inactive" count={10} />
            <StatusCard status="Sold Out" count={5} />
          </div>
          <div>
            <h2>TEST PULL USER INFO</h2>
            <p>Name: {userData.firstName} {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>Username: {userData.username}</p>
            <p>Shop Name: {userData.shopName}</p>
          </div>
        </div>
      )}
    />
  );
};

export default ShopManager;

// import React, { useContext } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { FaLink } from "react-icons/fa";
// // import userData from '../../components/ShopManager/Main/userData';
// import { AuthContext } from '../../context/AuthContext';


// // Dynamic Status Cards - will pull information from DB
// const StatusCard = ({ status, count }) => {
//   return (
//     <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 w-1/3 mx-2">
//       <div className="flex justify-center">
//         <span className="text-sm font-medium text-center">{status}</span>
//       </div>
//       <div className="text-center mt-4">
//         <span className="text-3xl font-bold">{count}</span>
//       </div>
//     </div>
//   );
// };

// const ShopManager = () => {
//   const { id } = useParams(); 
//   const { user } = useContext(AuthContext);
//   console.log(user)


  
//   return (
//     <>
//       <p>FRAGMENTS!</p>

      
//         <div>
//           <div className='justify-center text-center'>
//             <h2 className='text-4xl'>Hello {user.shopName}!</h2>
//             <Link to="#" className='flex items-center justify-center space-x-2 hover:underline'>
//               <FaLink />
//               <span>Shop Link</span>
//             </Link>
//           </div>
//           <div className="flex justify-center mt-8">
//             <StatusCard status="Active" count={20} />
//             <StatusCard status="Inactive" count={10} />
//             <StatusCard status="Sold Out" count={5} />
//           </div>
//           <div>
//             <h2>TEST PULL USER INFO</h2>
//             <p>Name: {user.firstName} {user.lastName}</p>
//             <p>Email: {user.email}</p>
//             <p>Username: {user.username}</p>
//             <p>Shop Name: {user.shopName}</p>
//             <p> 
//               Shipping Address: {
//             user.mailingAddress.street 
//             + ', ' 
//             + user.mailingAddress.city 
//             + ", " 
//             + user.mailingAddress.state 
//             + "."
//             }
//             </p>
//           </div>
//         </div>
    
  
//     </>
//   );
// };



// export default ShopManager;



