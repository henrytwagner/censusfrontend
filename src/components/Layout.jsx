import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import '../styles/layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
