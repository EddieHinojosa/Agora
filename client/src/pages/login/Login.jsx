import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <Link to='/usersignup'>User Signup</Link>
            <Link to='/shopsignup'>Shop Signup</Link>
        </div>
    )
}

export default Login