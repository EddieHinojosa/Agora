import { Link } from 'react-router-dom'

const Cart = () => {
    return (
        <div className='text-center'>
            <Link to="/checkout" className='hover:underline'>Checkout</Link>
        </div>
    )
}

export default Cart