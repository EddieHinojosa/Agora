import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Error = () => (
    <div>
        <h1>OOPS!</h1>
        <p>This is not the page your looking for.</p>
        <Link to='/'><FaHome size={24} /></Link>
    </div>
)

export default Error