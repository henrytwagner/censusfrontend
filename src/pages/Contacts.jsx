import React from 'react';
import GroupBanner from '@components/features/GroupBanner';
import ContactList from '@components/features/ContactList';
import { useParams } from 'react-router-dom';

const Contacts = () => {
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
      <div className="w-40 text-gray-500">{member.id}</div>
    </>
  );
  return (
    <div className="flex flex-col items-center gap-6 py-12 w-full box-border">
      <GroupBanner />
      <ContactList
        fetchUrl={`/api/contacts`}
        groupByField="last_name"
        renderFields={renderFields}
        navigateTo="/contacts"
      />
    </div>
  );
};

export default Contacts;
