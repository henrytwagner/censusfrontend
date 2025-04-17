import React, { useState } from 'react';
import ContactList from './ContactList';

const GeneralContactList = () => {
  const [selectedContact, setSelectedContact] = useState(null); // Track selected contact
  const fetchUrl = '/api/contacts';

  const handleSelectContact = (contact) => {
    setSelectedContact(contact); // Set the selected contact
  };

  const renderFields = (contact) => (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full h-24 w-24 overflow-hidden mb-4">
        {contact.profile_image_url ? (
          <img
            className="h-full w-full object-cover object-center"
            src={contact.profile_image_url}
            alt=""
          />
        ) : (
          <div className="w-full h-full bg-gray-500 text-white text-xl font-bold flex items-center justify-center">
            {contact.first_name && contact.last_name
              ? contact.first_name[0] + contact.last_name[0]
              : ''}
          </div>
        )}
      </div>
      <div className="font-bold text-lg">
        {contact.first_name} {contact.last_name}
      </div>
      <div className="text-gray-500">{contact.email}</div>
    </div>
  );

  return (
    <div className="flex">
      {!selectedContact ? (
        // Full-page card layout
        <ContactList
          fetchUrl={fetchUrl}
          groupByField="last_name"
          renderFields={renderFields}
          onSelectContact={handleSelectContact}
        />
      ) : (
        // Sidebar layout with selected contact details
        <>
          <div className="w-[250px] h-full border-r border-gray-300 p-4 flex flex-col gap-2">
            <ContactList
              fetchUrl={fetchUrl}
              groupByField="last_name"
              renderFields={(contact) => (
                <>
                  <div className="w-20">{contact.first_name}</div>
                  <div className="w-30 font-bold">{contact.last_name}</div>
                </>
              )}
              onSelectContact={handleSelectContact}
            />
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-xl font-bold mb-4">Selected Contact</h2>
            <p>
              <strong>Name:</strong> {selectedContact.first_name}{' '}
              {selectedContact.last_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralContactList;
