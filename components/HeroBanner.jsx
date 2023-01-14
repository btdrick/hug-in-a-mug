import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

/**
 * Component banner displayed at the top of the home page.
 * @param {*} heroBanner banner data to display
 */
const HeroBanner = ({ heroBanner: { smallText, midText, largeText1, image, product, buttonText, desc } }) => {
    return (
        <div className='hero-banner-container'>
            <div>
                <p className='cocoa-syrup'>{smallText}</p>
                <h3>{midText}</h3>
                <h1>{largeText1}</h1>
                <img src={urlFor(image)}
                    alt="featured product"
                    className='hero-banner-image' />

                <div>
                    <Link href={`/product/${product}`}>
                        <button type='button'
                            className='btn'>
                            {buttonText}
                        </button>
                    </Link>
                    <div className='desc'>
                        <h5>Description</h5>
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;