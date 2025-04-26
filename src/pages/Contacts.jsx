import React from 'react';
import GroupBanner from '@components/features/GroupBanner';
import ContactList from '@components/features/ContactList';
import { useParams } from 'react-router-dom';

const Contacts = () => {
  const headerFields = (
    <>
      <div className="w-12 shrink-0 m-2"></div>
      <div className="flex-1/2 truncate font-bold">Contact</div>
      <div className="flex-1/2 truncate font-bold">Username</div>
    </>
  );

  const renderFields = (member) => (
    <>
      <div className="rounded-full h-12 w-12 shrink-0 overflow-hidden m-2">
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
      <div className="flex-1/2 truncate">
        {member.first_name}{' '}
        <span className="font-bold">{member.last_name}</span>
      </div>
      <div className="flex-1/2 truncate text-gray-500">{member.username}</div>
    </>
  );
  return (
    <div className="flex flex-col items-center gap-6 py-12 w-full box-border overflow-y-auto">
      <GroupBanner />
      <ContactList
        fetchUrl={`/api/contacts`}
        groupByField="last_name"
        headerFields={headerFields}
        renderFields={renderFields}
        navigateTo="/contacts"
      />
    </div>
  );
};

export default Contacts;
