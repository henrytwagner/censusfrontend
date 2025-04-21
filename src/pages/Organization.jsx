import React from 'react';
import '../styles/organization.css';
import OrgHeader from '../components/OrgHeader';
import OrgMemberList from '../components/OrgMemberList';
import { useParams } from 'react-router-dom';

const Organization = () => {
  const { id } = useParams();

  const renderFields = (member) => (
    <>
      <div className="rounded-full h-12 aspect-square overflow-hidden m-2">
        {member.profile_image_url ? (
          <img
            className="h-full w-full object-cover object-center"
            src={member.profile_image_url}
            alt=""
          />
        ) : (
          <div className="w-full h-full bg-blue-700 text-white text-xl font-bold flex items-center justify-center">
            {member.first_name && member.last_name
              ? member.first_name[0] + member.last_name[0]
              : ''}
          </div>
        )}
      </div>
      <div className="w-20">{member.first_name}</div>
      <div className="w-30 font-bold">{member.last_name}</div>
      <div className="w-40 text-gray-500">{member.username}</div>
      <div className="w-20">{member.role}</div>
      <div className="w-20">{member.id}</div>
    </>
  );
  return (
    <div className="org-page">
      <OrgHeader id={id} />
      <OrgMemberList
        fetchUrl={`/api/organizations/${id}/members`}
        groupByField="last_name"
        renderFields={renderFields}
        navigateTo={`/organization/${id}/home`}
      />
    </div>
  );
};

export default Organization;
