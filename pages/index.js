import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

/**
 * The home page for the application.
 * @param {*} products product data
 * @param {*} bannerData banner data 
 */
const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Must have mugs for any kitchen</p>
    </div>

    <div className='products-container'>
      {products?.map((product) => <Product
        key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

export async function getServerSideProps() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
};

export default Home;