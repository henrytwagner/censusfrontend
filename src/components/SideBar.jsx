import React from 'react';
import '../styles/sidebar.css';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <button onClick={() => console.log('Home clicked')}>Home</button>
      <button onClick={() => console.log('Dashboard clicked')}>
        Dashboard
      </button>
      <button onClick={() => console.log('Organizations clicked')}>
        Organizations
      </button>
      <button onClick={() => console.log('Options clicked')}>Options</button>
      <button onClick={() => console.log('Profile clicked')}>Profile</button>
      <button onClick={() => console.log('Search clicked')}>Search</button>
    </aside>
  );
};

export default SideBar;
