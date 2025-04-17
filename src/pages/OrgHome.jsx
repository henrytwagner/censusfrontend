import React from 'react';
import ContactList from '../components/ContactList';
import Empty from '../components/Empty';
import { useParams } from 'react-router-dom';

const OrgHome = () => {
  const { orgId } = useParams();

  const renderFields = (contact) => (
    <p className="personname truncate w-full text-left">
      {contact.first_name}{' '}
      <span className="lastname font-bold">{contact.last_name}</span>
    </p>
  );

  return (
    <div className="flex">
      <ContactList
        fetchUrl={`/api/organizations/${orgId}/members`}
        groupByField="last_name"
        renderFields={renderFields}
      />
      <Empty />
    </div>
  );
};

export default OrgHome;
