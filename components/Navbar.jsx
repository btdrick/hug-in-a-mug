import React from 'react';
import { useStateContext } from '../context/StateContext';
import Link from 'next/link';
import Cart from './Cart';
import { AiOutlineShopping } from 'react-icons/ai';

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    return (
        <div className='navbar-container'>
            <p className='logo'>
                <Link href='/'>Hug in a Mug</Link>
            </p>
            <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
                <AiOutlineShopping />
                <span className='cart-item-qty'>{totalQuantities}</span>
            </button>

            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;