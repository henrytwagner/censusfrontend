import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '../../utils/authFetch';
import '@styles/contactlist.css';
import SearchBar from '@components/ui/SearchBar';
import { useSearchParams } from 'react-router-dom';

const groupBy = (array, getKey) => {
  return array.reduce((result, item) => {
    const key = getKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});
};

const ContactListSidebar = ({ fetchUrl, groupByField, renderFields }) => {
  const authFetch = useAuthFetch();
  const [searchParams, setSearchParams] = useSearchParams(); // Access query parameters
  const [contacts, setContacts] = useState([]);
  const contact = searchParams.get('contactId') || '';
  const contactType = searchParams.get('contactType') || '';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await authFetch(fetchUrl); //TODO: connect backend
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error('Failed to load contacts:', err);
      }
    };

    fetchContacts();
  }, [fetchUrl]);

  /*TODO: make grouping by last visited (add to contact model)*/
  const groupedContacts = groupBy(contacts, (person) =>
    person.last_name[0].toUpperCase()
  );

  const sortedKeys = Object.keys(groupedContacts).sort();

  return (
    <div className="contactlist border-r border-gray-300 flex flex-col shrink-0 p-6 gap-2.5 h-full w-50 sm:w-60">
      <SearchBar />
      <div className="contactlist-scrollable w-full overflow-y-auto pt-2.5 pb-7.5 scrollbar-hide">
        {/* TODO: make this not just character, if sorting contacts by recent want words */}
        {sortedKeys.map((key) => (
          <div key={key}>
            <div
              style={{ boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)' }}
              className="characterheader bg-white items-center flex h-6 px-2 py-0.5 shrink-0 font-bold rounded-md"
            >
              {key}
            </div>
            {groupedContacts[key].map((member) => {
              /*TODO: Slight shift below when clicking on last element of letter*/
              return (
                <div
                  key={member.id}
                  className={`person cursor-default flex items-center py-0.5 px-2 h-10 flex-shrink-0 self-stretch justify-between rounded-md border-t border-gray-200 ${member.id === contact ? 'selected border-l-4 border-l-blue-500 bg-black/5' : 'hover:bg-black/1.5'}`}
                  onClick={() => {
                    setSearchParams({
                      contactId: member.id,
                      contactType: contactType,
                    });
                  }}
                >
                  {renderFields(member)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactListSidebar;
