import './Layout.css';
import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from './header/Header';
import Nav from './nav/Nav';

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main>
                <Nav />
                <div className='page-content'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout;