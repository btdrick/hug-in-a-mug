import React from 'react';
import { AiFillInstagram, AiOutlineTwitter, AiOutlineCopyright } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='footer-container'>
            <p>2023{<AiOutlineCopyright/>} Hug in a Mug all rights reservered</p>
            <p className='icons'>
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
        </div>
    );
};

export default Footer;