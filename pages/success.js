import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { BsBagCheckFill } from 'react-icons/bs';
import { runConfetti } from '../lib/utils';
import Link from 'next/link';

/**
 * The success page after a successful purchase.
 */
const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    //Clear cart and fire some confetti
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runConfetti();
    }, []);

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your purchase!</h2>
                {/* <p className='email-msg'>Check your email inbox for the receipt.</p> */}
                <p className='description'>If you have any questions, please email us at
                    <a className='email' href='mailto:thisismyhandle@huginamug.com'>
                        thisismyhandle@huginamug.com
                    </a>
                </p>
                <Link href="/">
                    <button type='button'
                        className='btn'
                        width='300px'>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Success;