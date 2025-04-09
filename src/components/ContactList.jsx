import React, { useState } from 'react';
import '../styles/contactlist.css';
import SearchBar from './SearchBar';

const contacts = [
  // A
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
  // B
  { first: 'Logan', last: 'Burger' },
  { first: 'Blake', last: 'Bryant' },
  { first: 'Zoe', last: 'Benson' },
  { first: 'Miles', last: 'Baker' },
  { first: 'Ella', last: 'Briggs' },
  // C
  { first: 'Grace', last: 'Conners' },
  { first: 'Caleb', last: 'Coleman' },
  { first: 'Nina', last: 'Clark' },
  { first: 'Aaron', last: 'Carter' },
  { first: 'Jade', last: 'Caldwell' },
  // D
  { first: 'Ryan', last: 'Dalton' },
  { first: 'Eva', last: 'Dunn' },
  { first: 'Leo', last: 'Daniels' },
  { first: 'Maya', last: 'Dorsey' },
  { first: 'Ian', last: 'Dillard' },
  // E
  { first: 'Sienna', last: 'Ellis' },
  { first: 'Gavin', last: 'Edwards' },
  { first: 'Tessa', last: 'Emerson' },
  { first: 'Asher', last: 'Elliott' },
  { first: 'Hazel', last: 'Evans' },
  // G
  { first: 'Julian', last: 'Gaines' },
  { first: 'Mila', last: 'Gibson' },
  { first: 'Axel', last: 'Griffin' },
  { first: 'Aria', last: 'Garner' },
  { first: 'Wesley', last: 'George' },
  // H
  { first: 'Luna', last: 'Harper' },
  { first: 'Carson', last: 'Hayes' },
  { first: 'Bella', last: 'Hoffman' },
  { first: 'Jonah', last: 'Hammond' },
  { first: 'Sadie', last: 'Hicks' },
  // J
  { first: 'Piper', last: 'Jordan' },
  { first: 'Jaxon', last: 'Jennings' },
  { first: 'Aurora', last: 'Justice' },
  { first: 'Emmett', last: 'Jacobs' },
  { first: 'Anna', last: 'Jarvis' },
  // K
  { first: 'Reid', last: 'Keller' },
  { first: 'Ruby', last: 'Klein' },
  { first: 'Tristan', last: 'Kim' },
  { first: 'Isla', last: 'Kirk' },
  { first: 'Brody', last: 'Kane' },
  // L
  { first: 'Adeline', last: 'Lewis' },
  { first: 'Elliot', last: 'Lee' },
  { first: 'Alice', last: 'Lawson' },
  { first: 'Maddox', last: 'Lowry' },
  { first: 'Clara', last: 'Leon' },
  // M
  { first: 'Juliette', last: 'Murray' },
  { first: 'Preston', last: 'Moss' },
  { first: 'Hope', last: 'Moody' },
  { first: 'Silas', last: 'Meadows' },
  { first: 'Freya', last: 'Marin' },
  // R
  { first: 'Adrian', last: 'Reed' },
  { first: 'Cora', last: 'Rivers' },
  { first: 'Jude', last: 'Russell' },
  { first: 'Vivian', last: 'Roach' },
  { first: 'Beau', last: 'Ramos' },
  // S
  { first: 'Ivy', last: 'Sharp' },
  { first: 'Damian', last: 'Simmons' },
  { first: 'Lena', last: 'Stone' },
  { first: 'Zion', last: 'Strickland' },
  { first: 'Willa', last: 'Sloan' },
  // T
  { first: 'Giselle', last: 'Tanner' },
  { first: 'Keegan', last: 'Thorne' },
  { first: 'Skye', last: 'Turner' },
  { first: 'Finn', last: 'Talbot' },
  { first: 'Delilah', last: 'Trevino' },
  // W
  { first: 'Henry', last: 'Wagner' },
  { first: 'Eli', last: 'Wallace' },
  { first: 'Camille', last: 'Wiley' },
  { first: 'Dean', last: 'Watkins' },
  { first: 'Faith', last: 'West' },
];

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
  const [selectedIndex, setSelectedIndex] = useState(null);

  const groupedContacts = groupBy(contacts, (person) =>
    person.last[0].toUpperCase()
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
                  key={`${person.first}-${person.last}`}
                  className={`person ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedIndex(index);
                    console.log(`Selected: ${person.first}`);
                  }}
                >
                  <p className="personname">
                    {person.first}{' '}
                    <span className="lastname">{person.last}</span>
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
