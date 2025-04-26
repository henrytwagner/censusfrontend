import React from 'react';
import Empty from '../components/ui/Empty';
import ContactListSidebar from '../components/features/ContactListSidebar';

const Home = () => {
  const renderFields = (contact) => (
    <>
      <div className="personname truncate w-full text-left">
        {contact.first_name}{' '}
        <span className="lastname font-bold">{contact.last_name}</span>
      </div>
    </>
  );

  return (
    <div className="flex">
      <ContactListSidebar
        fetchUrl="/api/contacts"
        groupByField="last_name"
        renderFields={renderFields}
      />
      <Empty />
    </div>
  );
};

export default Home;
