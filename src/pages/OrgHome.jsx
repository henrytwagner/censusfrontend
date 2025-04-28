import React from 'react';
import ContactListSidebar from '../components/features/ContactListSidebar';
import Empty from '../components/ui/Empty';
import { useParams } from 'react-router-dom';
import Contact from '@components/features/Contact';

const OrgHome = () => {
  const { orgId } = useParams();

  const renderFields = (member) => (
    <>
      <div className="personname truncate w-full text-left">
        {member.first_name}{' '}
        <span className="lastname font-bold">{member.last_name}</span>
      </div>

      {member.status === 'active' ? (
        <>
          {/* small dot, only below sm */}
          <div className="inline-block w-2 h-2 rounded-full border-1 text-emerald-700 bg-emerald-200" />
        </>
      ) : (
        <>
          {/* small dot, only below sm */}
          <div className="inline-block w-2 h-2 rounded-full border-1 text-red-700 bg-red-200" />
        </>
      )}
    </>
  );

  return (
    <div className="flex">
      <ContactListSidebar
        fetchUrl={`/api/organizations/${orgId}/members`}
        groupByField="last_name"
        renderFields={renderFields}
      />
      <Contact />
    </div>
  );
};

export default OrgHome;
