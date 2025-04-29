import React from 'react';
import GroupBanner from '@components/features/GroupBanner';
import ContactList from '@components/features/ContactList';

const Contacts = () => {
  const headerFields = (
    <>
      <div className="w-12 shrink-0 m-2"></div>
      <div className="flex-1/3 text-sm truncate">Contact</div>
      <div className="flex-1/3 text-sm truncate">Contact Points</div>
      <div className="flex-1/3 text-sm truncate">Added</div>
    </>
  );

  const renderFields = (member) => (
    <>
      {/* Profile Image         TODO: Make this a component*/}
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

      {/* User */}
      <div className="flex-1/3 min-w-0 flex flex-col ">
        <div className="w-full truncate">
          {member.first_name}{' '}
          <span className="font-bold">{member.last_name}</span>
        </div>
        <div className="text-xs ">{member.username}</div>
      </div>

      {/* Contact */}
      <div className="flex-1/3 flex flex-col justify-center min-w-0 text-xs gap-1">
        <div className="w-full truncate">{member.email}</div>
        {/* TODO: add phone number */}
        <div className="w-fill text-xs ">{member.phone}</div>
      </div>

      {/* Added */}
      <div className="flex-1/3 truncate text-sm">
        {member.created_at
          ? new Date(member.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })
          : '-'}
      </div>
    </>
  );
  return (
    <div className="flex flex-col items-center gap-2 py-6 w-full box-border overflow-y-auto">
      {/* <GroupBanner /> */}
      {/* <div className="w-150 lg:w-2/3 h-fit text-[40px] font-thin text-left">
        CONTACTS
      </div> */}
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
