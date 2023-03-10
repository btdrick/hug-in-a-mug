import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../context/StateContext';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

/**
 * Component for the product details page
 * for the currently selected product.
 * @param {*} product current product data
 * @param {*} products other product data
 */
const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, setQty, onAdd, setShowCart } = useStateContext();
    const pngImages = image.filter(image => image.asset._ref.endsWith("-png"));

    //Revert product quantity to 1 before leaving the page.
    useEffect(() => {
        window.addEventListener('beforeunload', setQty(1));
      }, [])

    //Event handler for click Buy Now button
    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={Object.keys(pngImages).length > 0 ? urlFor(pngImages && pngImages[index]) : urlFor(image && image[index])}
                            alt="product detailed image"
                            className='product-detail-image' />
                    </div>
                    <div className='small-images-container'>
                        {/* Prioritize reference images with transparent background */}
                        {Object.keys(pngImages).length > 0 ? (pngImages.map((item, i) => ( 
                            <img
                            key={i}
                            src={urlFor(item)}
                            className={i === index ? 'small-image selected-image' :
                                'small-image'}
                            onMouseEnter={() => setIndex(i)} /> ))
                        ) : (
                            image.map((item, i) => ( 
                            <img
                            key={i}
                            src={urlFor(item)}
                            className={i === index ? 'small-image selected-image' :
                                'small-image'}
                            onMouseEnter={() => setIndex(i)} /> ))
                        )}
                    </div>
                </div>

                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className='price'>${price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus'
                                onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num'
                            >{qty}</span>
                            <span className='plus'
                                onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button'
                            className='add-to-cart'
                            onClick={() => onAdd(product, qty)}>Add to Cart</button>
                        <button type='button'
                            className='buy-now'
                            onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((item) => (
                            <Product key={item._id}
                                product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

//Predefine static paths on build time
export async function getStaticPaths() {
    //Return current slug property for all products
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

//Called when data required to render page is available at build time
export async function getStaticProps({ params: { slug } }) {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { product, products }
    }
};

export default ProductDetails;