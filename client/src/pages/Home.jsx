import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../components/Home/Banner'
import DisplayCarousel from '../components/Home/DisplayCarousel'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null) // May not be needed depending on db

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shopmanager/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error getting products:', error);
    }
  }

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user')
      setUser(response.data)
    } catch (error) {
      console.error('Error getting user:', error)
    }
  }
}
















// OLD CODE

// import { Link } from 'react-router-dom';
// import HeaderImg from '../assets/img/annie-spratt-TywjkDHf0Ps-unsplash.jpg';

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-start justify-start bg-gray-50 px-4 md:px-10 pt-0">
//       <div className="w-full flex flex-col md:flex-row items-center justify-between bg-[#4a000a] p-4 rounded-lg shadow-lg">
//         <div className="flex-1 text-center  md:flex md:flex-col md:justify-center">
//           <h2 className="text-3xl md:text-5xl text-white leading-tight">Find something</h2>
//           <h2 className="text-3xl md:text-5xl text-white leading-tight">just as unique</h2>
//           <h2 className="text-3xl md:text-5xl text-white leading-tight">as you</h2>
//           {/* <h2 className="text-3xl md:text-5xl text-white leading-tight">unique as</h2>
//           <h2 className="text-3xl md:text-5xl text-white leading-tight">you.</h2> */}
//           <Link to="/login/usersignup">
//             <button className="mt-6 px-4 py-2 md:px-6 md:py-2 bg-white text-[#4a000a] font-bold rounded-lg shadow-lg hover:bg-gray-200">
//               Sign Up
//             </button>
//           </Link>
//         </div>
//         <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4 h-64 md:h-full">
//           <img
//             src={HeaderImg}
//             alt="Banner"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;




