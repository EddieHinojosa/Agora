import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-100">
            <div className="flex items-center">
                <Link to="/" className="mr-4 text-xl font-bold">
                    Agora
                </Link>
            </div>
            <div className="flex-grow mx-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-1 pr-12 border-gray-300 rounded-lg"
                    />
                    <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        {user.shopName ? (
                            <Link to="/shopmanager" className="text-sm">
                                Sell
                            </Link>
                        ) : (
                            <Link to="/login/shopsignup" className="text-sm">
                                Create a Store
                            </Link>
                        )}
                        <button onClick={logout} className="text-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm">Login</Link>
                        <Link to="/login/usersignup" className="text-sm">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

