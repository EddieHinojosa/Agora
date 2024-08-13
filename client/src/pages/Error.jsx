import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Error = () => (
  <div className="text-center">
    <h2 className="text-4xl font-bold mb-4">OOPS!</h2>
    <p className="mb-4">This is not the page you're looking for.</p>
    <div className="flex justify-center">
      <Link to="/">
        <FaHome size={24} />
      </Link>
    </div>
  </div>
);

export default Error;
