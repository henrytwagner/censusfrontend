import React from 'react';
import '../styles/organization.css';
import OrgHeader from '../components/OrgHeader';
import OrgMemberList from '../components/OrgMemberList';
import { useParams } from 'react-router-dom';

const Organization = () => {
  const { id } = useParams();

  return (
    <div className="org-page">
      <OrgHeader id={id} />
      <OrgMemberList id={id} />
    </div>
  );
};

export default Organization;
