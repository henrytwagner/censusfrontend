import React from 'react';
import '../styles/organization.css';
import OrgHeader from '../components/OrgHeader';

const Organization = () => {
  return (
    <div className="org-page">
      <OrgHeader id="b2c0e259-a7c7-49ad-9d93-3c66308bb8a3" />
      <div className="org-members">
        <div className="org-member-list">
          <div className="member-row">Henry Wagner</div>
          <div className="member-row">Thomas Jefferson</div>
        </div>
      </div>
    </div>
  );
};

export default Organization;
