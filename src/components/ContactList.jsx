import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '../utils/authFetch';
import '../styles/contactlist.css';
import SearchBar from './SearchBar';

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

const ContactList = ({ fetchUrl, groupByField, renderFields }) => {
  const authFetch = useAuthFetch();

  const [contacts, setContacts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await authFetch(fetchUrl); //TODO: connect backend
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error('Failed to load conatacts:', err);
      }
    };

    fetchContacts();
  }, [fetchUrl]);

  /*TODO: make grouping by last visited (add to contact model)*/
  const groupedContacts = groupBy(contacts, (person) =>
    person.last_name[0].toUpperCase()
  );

  const sortedKeys = Object.keys(groupedContacts).sort();

  let itemCounter = 0;

  return (
    <div
      className="contactlist border-r border-gray-300 flex flex-col p-6 gap-2.5 h-full"
      style={{ width: 'clamp(200px, 20%, 250px)' }}
    >
      <SearchBar />
      <div className="contactlist-scrollable w-full overflow-y-auto pt-2.5 pb-7.5 scrollbar-hide">
        {/* TODO: make this not just character, if sorting contacts by recent want words */}
        {sortedKeys.map((letter) => (
          <div key={letter}>
            <div
              style={{ boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)' }}
              className="characterheader bg-white items-center flex h-5 px-2 py-0.5 shrink-0 font-bold rounded-md"
            >
              {letter}
            </div>
            {groupedContacts[letter].map((person) => {
              /*TODO: Slight shift below when clicking on last element of letter*/
              const index = itemCounter++;
              return (
                <div
                  key={`${person.first_name}-${person.last_name}`}
                  className={`person cursor-default flex items-center py-0.5 px-2 h-7.5 flex-shrink-0 self-stretch justify-start rounded-md border-t border-gray-200 hover:bg-black/1.5 ${selectedIndex === index ? 'selected border-l-4 border-l-blue-500 bg-black/5' : ''}`}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                >
                  {renderFields(person)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
