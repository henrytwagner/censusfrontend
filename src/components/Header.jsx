import React from 'react';
import OrgStack from './OrgStack';
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <div className="left">
        <OrgStack />
      </div>
      <div className="center" style={{ fontSize: '40px', fontWeight: 100 }}>
        CENSUS
      </div>
      <div className="right">
        <div style={{ color: 'var(--color-text-muted, #000)' }}>[ ]</div>
      </div>
    </header>
  );
}

export default Header;
