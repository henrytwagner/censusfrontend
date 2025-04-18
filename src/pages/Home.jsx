import React from 'react';
import ContactList from '../components/ContactList';
import Empty from '../components/Empty';

const Home = () => {
  const renderFields = (contact) => (
    <p className="personname truncate w-full text-left">
      {contact.first_name}{' '}
      <span className="lastname font-bold">{contact.last_name}</span>
    </p>
  );

  return (
    <div className="flex">
      <ContactList
        fetchUrl="/api/contacts"
        groupByField="last_name"
        renderFields={renderFields}
      />
      <Empty />
    </div>
  );
};

export default Home;
