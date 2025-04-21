import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '@components/layout/Header';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-screen flex-1 flex box-border overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
