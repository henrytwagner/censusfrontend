import React, { useState } from 'react';
import ContactList from './ContactList';

const OrgMemberList = ({ id }) => {
  const [selectedMember, setSelectedMember] = useState(null); // Track selected member
  const fetchUrl = `/api/organizations/${id}/members`;

  const handleSelectMember = (member) => {
    setSelectedMember(member); // Set the selected member
  };

  const renderFields = (member) => (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full h-24 w-24 overflow-hidden mb-4">
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
      <div className="font-bold text-lg">
        {member.first_name} {member.last_name}
      </div>
      <div className="text-gray-500">{member.username}</div>
      <div className="text-sm text-gray-400">{member.role}</div>
    </div>
  );

  return (
    <div className="flex">
      {!selectedMember ? (
        // Full-page card layout
        <ContactList
          fetchUrl={fetchUrl}
          groupByField="last_name"
          renderFields={renderFields}
          onSelectContact={handleSelectMember}
        />
      ) : (
        // Sidebar layout with selected member details
        <>
          <div className="w-[250px] h-full border-r border-gray-300 p-4 flex flex-col gap-2">
            <ContactList
              fetchUrl={fetchUrl}
              groupByField="last_name"
              renderFields={(member) => (
                <>
                  <div className="w-20">{member.first_name}</div>
                  <div className="w-30 font-bold">{member.last_name}</div>
                </>
              )}
              onSelectContact={handleSelectMember}
            />
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-xl font-bold mb-4">Selected Member</h2>
            <p>
              <strong>Name:</strong> {selectedMember.first_name}{' '}
              {selectedMember.last_name}
            </p>
            <p>
              <strong>Role:</strong> {selectedMember.role}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrgMemberList;
