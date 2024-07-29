import { Link } from 'react-router-dom';
import HeaderImg from '../assets/img/annie-spratt-TywjkDHf0Ps-unsplash.jpg';

const Home = () => {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 pr-10 pl-10 pt-4">
      <div className="w-full flex items-center justify-between bg-[#4a000a] p-4 rounded-lg shadow-lg">
        <div className="flex-1 text-center">
          <h2 className="text-5xl text-white">Find</h2>
          <h2 className="text-5xl text-white">something</h2>
          <h2 className="text-5xl text-white">just as</h2>
          <h2 className="text-5xl text-white">unique as</h2>
          <h2 className="text-5xl text-white">you.</h2>
          <Link to="/login/usersignup">
            <button className="mt-4 px-6 py-2 bg-white text-[#4a000a] font-bold rounded-lg shadow-lg hover:bg-gray-200">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="w-1/2 h-full ml-4">
          <img
            src={HeaderImg}
            alt="Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;


