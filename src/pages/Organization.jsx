import React from 'react';
import '../styles/organization.css';
import OrgHeader from '../components/OrgHeader';

const Organization = () => {
  return (
    <div className="org-page">
      <OrgHeader />
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
