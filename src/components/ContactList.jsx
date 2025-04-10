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

const ContactList = () => {
  const authFetch = useAuthFetch();

  const [contacts, setContacts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await authFetch('api/contacts'); //TODO: connect backend
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error('Failed to load conatacts:', err);
      }
    };

    fetchContacts();
  }, []);

  /*TODO: make grouping by last visited (add to contact model)*/
  const groupedContacts = groupBy(contacts, (person) =>
    person.last_name[0].toUpperCase()
  );

  const sortedKeys = Object.keys(groupedContacts).sort();

  let itemCounter = 0;

  return (
    <div className="contactlist">
      <SearchBar />
      <div className="contactlist-scrollable">
        {sortedKeys.map((letter) => (
          <div key={letter}>
            <div className="characterheader">{letter}</div>
            {groupedContacts[letter].map((person) => {
              const index = itemCounter++;
              return (
                <div
                  key={`${person.first_name}-${person.last_name}`}
                  className={`person ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                >
                  <p className="personname">
                    {person.first_name}{' '}
                    <span className="lastname">{person.last_name}</span>
                  </p>
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
