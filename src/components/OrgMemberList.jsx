import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '../utils/authFetch';
import SearchBar from './SearchBar';

const OrgMemberList = ({ id }) => {
  const authFetch = useAuthFetch();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await authFetch(`/api/organizations/${id}/members`);
        const data = await response.json();
        const sortedData = data.sort((a, b) =>
          (a.last_name || '').localeCompare(b.last_name || '')
        );
        setMembers(sortedData);
      } catch (err) {
        console.error('Failed to load members:', err);
      }
    };

    fetchMembers();
  }, [id]);

  return (
    <div className="w-2/4 h-fit flex flex-col gap-4 text-lg">
      <SearchBar />
      <div className="flex justify-start px-2 py-0.5 border-b-2">
        <div className="w-20 font-bold">First</div>
        <div className="w-30 font-bold">Last</div>
        <div className="w-40 font-bold">Username</div>
        <div className="w-20 font-bold">Role</div>
      </div>
      <div>
        {members.map((member) => (
          <div
            key={member.username}
            className="flex items-center justify-start gap-4 px-2 py-0 "
          >
            <div className="rounded-full h-12 aspect-square overflow-hidden m-2">
              {member.profile_image_url ? (
                <img
                  className="h-full w-full object-cover object-center"
                  src={member.profile_image_url}
                  alt=""
                />
              ) : (
                <div className="w-full h-full bg-blue-700 text-white text-xl font-bold flex items-center justify-center">
                  {member.first_name && member.last_name
                    ? member.first_name[0] + member.last_name[0]
                    : ''}
                </div>
              )}
            </div>
            <div className="w-20 ">{`${member.first_name}`}</div>
            <div className="w-30 font-bold">{`${member.last_name}`}</div>
            <div className="w-40 text-gray-500">{`${member.username}`}</div>
            <div className="w-20">{`${member.role}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgMemberList;
