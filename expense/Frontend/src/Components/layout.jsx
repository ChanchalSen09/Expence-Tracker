import React from 'react';
import Header from './header';
import Footer from './footer';

function Layout({ children }) {
    return (
        <div className="">
            <Header />
            <main className="">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;