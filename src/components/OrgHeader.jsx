import React from 'react';
import '../styles/orgheader.css';

const OrgHeader = () => {
  return (
    <div className="org-header">
      <div className="org-header-content">
        <div className="org-image"></div>
        <div className="org-info">
          <div className="org-title">Organization</div>
          <div className="org-desc">Description</div>
        </div>
      </div>
    </div>
  );
};

export default OrgHeader;
