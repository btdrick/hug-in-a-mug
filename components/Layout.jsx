import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Component serving as the application layout.
 * @param {*} children component page props
 */
const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Head>
                <title>Hug in a Mug</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className='main-container'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;