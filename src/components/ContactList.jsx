import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '../utils/authFetch';
import SearchBar from './SearchBar';

const ContactList = ({
  fetchUrl,
  groupByField,
  renderFields,
  onSelectContact,
}) => {
  const authFetch = useAuthFetch();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await authFetch(fetchUrl);
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error('Failed to load contacts:', err);
      }
    };

    fetchContacts();
  }, [fetchUrl]);

  const groupedContacts = contacts.reduce((result, contact) => {
    const key = contact[groupByField]?.[0]?.toUpperCase() || '#';
    if (!result[key]) result[key] = [];
    result[key].push(contact);
    return result;
  }, {});

  const sortedKeys = Object.keys(groupedContacts).sort();

  return (
    <div className="w-full h-full overflow-y-auto">
      <SearchBar />
      {sortedKeys.map((key) => (
        <div key={key}>
          <div className="font-bold bg-gray-100 px-2 py-1 rounded-md mb-2">
            {key}
          </div>
          {groupedContacts[key].map((contact) => (
            <div
              key={contact.id}
              className="p-4 border border-gray-300 rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectContact(contact)} // Notify parent when a contact is selected
            >
              {renderFields(contact)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
