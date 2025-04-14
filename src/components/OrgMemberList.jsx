import React, { useState } from 'react';
import { useAuthFetch } from '../utils/authFetch';
import SearchBar from './SearchBar';

const OrgMemberList = ({ id }) => {
  const authFetch = useAuthFetch();

  const [members, setMembers] = useState([
    {
      id: 2,
      username: 'henrywagner',
      email: 'htwags22@gmail.com',
      first_name: 'Henry',
      last_name: 'Wagner',
    },
    {
      id: 3,
      username: 'smander',
      email: 'steve@gmail.com',
      first_name: 'Steven',
      last_name: 'Mander',
    },
  ]);

  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <SearchBar />
      <div>
        {members.map((member) => (
          <div key={member.id} className="h-10"></div>
        ))}
      </div>
    </div>
  );
};

export default OrgMemberList;
