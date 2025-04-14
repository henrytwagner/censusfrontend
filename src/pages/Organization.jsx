import React from 'react';
import '../styles/organization.css';
import OrgHeader from '../components/OrgHeader';
import OrgMemberList from '../components/OrgMemberList';

const Organization = () => {
  return (
    <div className="org-page">
      <OrgHeader id="b2c0e259-a7c7-49ad-9d93-3c66308bb8a3" />
      <OrgMemberList id="b2c0e259-a7c7-49ad-9d93-3c66308bb8a3" />
    </div>
  );
};

export default Organization;
