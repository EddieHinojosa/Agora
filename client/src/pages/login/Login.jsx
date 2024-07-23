import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <div><Link to='/login/usersignup' className='hover:underline'>User Signup</Link></div>
            <div><Link to='/login/shopsignup' className='hover:underline'>Shop Signup</Link></div>
        </div>
    )
}

export default Login