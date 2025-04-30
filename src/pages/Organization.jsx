import React from 'react';
import GroupBanner from '@components/features/GroupBanner';
import ContactList from '@components/features/ContactList';
import { useParams } from 'react-router-dom';

const Organization = () => {
  const { id } = useParams();

  const headerFields = (
    <>
      <div className="w-12 shrink-0 m-2"></div>
      <div className="flex-1/4 truncate text-sm">Member</div>
      <div className="flex-1/4 truncate text-sm">Email</div>
      <div className="flex-1/4 truncate text-sm">Role</div>
      <div className="flex-1/4 truncate text-sm">Joined</div>
      <div className="flex-1/4 truncate text-sm">Status</div>
    </>
  );
  const renderFields = (member) => (
    <>
      {/* Profile Image */}
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
      <div className="flex-1/4 flex flex-col truncate">
        <div>
          {member.first_name}{' '}
          <span className="font-bold">{member.last_name}</span>
        </div>
        <div className="text-xs ">{member.username}</div>
      </div>

      {/* Contact */}
      <div className="flex-1/4 flex flex-col justify-center min-w-0 text-xs gap-1">
        <div className="w-full truncate">{member.email}</div>
        {/* TODO: add phone number */}
        <div className="w-fill text-xs ">{member.phone}</div>
      </div>

      {/* Role */}
      <div className="flex-1/4 truncate text-sm">{member.role}</div>

      {/* Joined */}
      <div className="flex-1/4 truncate text-sm">
        {member.joined_at
          ? new Date(member.joined_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })
          : '-'}
      </div>

      {/* Status */}
      <div className="flex-1/4 truncate flex justify-start gap-2 items-center text-sm">
        {member.status === 'active' ? (
          <>
            {/* small dot, only below sm */}
            <div className="inline-block w-2 h-2 rounded-full border-1 text-emerald-700 bg-emerald-200 text-" />
            <div className="text-emerald-700 md:inline-flex">Active</div>
          </>
        ) : (
          <>
            {/* small dot, only below sm */}
            <div className="inline-block w-2 h-2 rounded-full border-1 text-red-700 bg-red-200" />
            <div className="text-red-700 md:inline-flex">Inactive</div>
          </>
        )}
      </div>
    </>
  );
  return (
    <div className="flex flex-col items-center gap-6 py-12 w-full box-border overflow-y-auto">
      <GroupBanner id={id} />
      <ContactList
        listType="users"
        fetchUrl={`/api/organizations/${id}/members`}
        groupByField="last_name"
        headerFields={headerFields}
        renderFields={renderFields}
        navigateTo={`/organization/${id}/home`}
      />
    </div>
  );
};

export default Organization;
