import React from 'react';
import '../styles/organization.css';
import OrgHeader from '../components/OrgHeader';
import OrgMemberList from '../components/OrgMemberList';
import { useParams } from 'react-router-dom';

const Organization = () => {
  const { id } = useParams();

  const renderFields = (member) => (
    <>
      <div className="w-20">{member.first_name}</div>
      <div className="w-30 font-bold">{member.last_name}</div>
      <div className="w-40 text-gray-500">{member.username}</div>
      <div className="w-20">{member.role}</div>
    </>
  );
  return (
    <div className="org-page">
      <OrgHeader id={id} />
      <OrgMemberList
        fetchUrl={`/api/organizations/${id}/members`}
        groupByField="last_name"
        renderFields={renderFields}
      />
    </div>
  );
};

export default Organization;
