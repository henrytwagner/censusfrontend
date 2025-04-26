import React from 'react';
import ContactListSidebar from '../components/features/ContactListSidebar';
import Empty from '../components/ui/Empty';
import { useParams } from 'react-router-dom';

const OrgHome = () => {
  const { orgId } = useParams();

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
        fetchUrl={`/api/organizations/${orgId}/members`}
        groupByField="last_name"
        renderFields={renderFields}
      />
      <Empty />
    </div>
  );
};

export default OrgHome;
