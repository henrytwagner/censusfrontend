import React from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import ContactList from './ContactList';
import '../styles/layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="body">
        {/* <Sidebar /> */}
        <ContactList />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
