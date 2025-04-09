import React, { useState } from 'react';
import '../styles/contactlist.css';
import SearchBar from './SearchBar';

const contacts = [
  { first: 'Mike', last: 'Adams' },
  { first: 'Sarah', last: 'Akers' },
  { first: 'Liam', last: 'Albright' },
  { first: 'Emma', last: 'Aldridge' },
  { first: 'Noah', last: 'Alexander' },
  { first: 'Olivia', last: 'Alford' },
  { first: 'Elijah', last: 'Allen' },
  { first: 'Ava', last: 'Allison' },
  { first: 'James', last: 'Alston' },
  { first: 'Sophia', last: 'Alvarez' },
  { first: 'William', last: 'Andersen' },
  { first: 'Isabella', last: 'Anderson' },
  { first: 'Benjamin', last: 'Andrade' },
  { first: 'Mia', last: 'Andrews' },
  { first: 'Lucas', last: 'Angel' },
  { first: 'Charlotte', last: 'Anthony' },
  { first: 'Henry', last: 'Archer' },
  { first: 'Amelia', last: 'Arellano' },
  { first: 'Alexander', last: 'Ariza' },
  { first: 'Harper', last: 'Armand' },
  { first: 'Ethan', last: 'Armstrong' },
  { first: 'Evelyn', last: 'Arnold' },
  { first: 'Daniel', last: 'Arroyo' },
  { first: 'Abigail', last: 'Arthur' },
  { first: 'Matthew', last: 'Asher' },
  { first: 'Emily', last: 'Ashley' },
  { first: 'Jackson', last: 'Ashton' },
  { first: 'Ella', last: 'Atkins' },
  { first: 'Sebastian', last: 'Atwood' },
  { first: 'Elizabeth', last: 'Aubrey' },
  { first: 'Logan', last: 'Auger' },
  { first: 'Chloe', last: 'Ault' },
  { first: 'Levi', last: 'Austin' },
  { first: 'Grace', last: 'Avery' },
  { first: 'David', last: 'Avila' },
  { first: 'Lily', last: 'Axelrod' },
  { first: 'Wyatt', last: 'Ayers' },
  { first: 'Zoey', last: 'Ayres' },
  { first: 'Owen', last: 'Aziz' },
  { first: 'Nora', last: 'Azizi' },
];

const ContactList = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index, person) => {
    setSelectedIndex(index);
    onSelect?.(person); // pass person data up if needed
  };

  return (
    <div className="contactlist">
      <SearchBar />
      <div className="contactlist-scrollable">
        <div className="characterheader">A</div>
        {contacts.map((person, index) => (
          <div
            key={`${person.first}-${person.last}`}
            className={`person ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => handleSelect(index, person)}
          >
            <p className="personname">
              {person.first} <span className="lastname">{person.last}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
