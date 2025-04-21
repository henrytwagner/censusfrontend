import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '../utils/authFetch';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

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

const OrgMemberList = ({
  fetchUrl,
  groupByField,
  renderFields,
  navigateTo,
}) => {
  const authFetch = useAuthFetch();
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await authFetch(fetchUrl);
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error('Failed to load members:', err);
      }
    };

    fetchMembers();
  }, [fetchUrl]);

  const groupedMembers = groupBy(
    members,
    (member) => member[groupByField]?.[0]?.toUpperCase() || '#'
  );

  const sortedKeys = Object.keys(groupedMembers).sort();

  const handleMemberClick = (member) => {
    if (navigateTo) {
      navigate(`${navigateTo}?selectedMemberId=${member.id}`); // Pass the selected ID as a query parameter
    } else {
      console.log('Member clicked:', member);
    }
  };

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
        {sortedKeys.map((key) => (
          <div key={key}>
            {/* <div className="font-bold bg-gray-100 px-2 py-1 rounded-md mb-2">
              {key}
            </div> */}
            {groupedMembers[key].map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-start gap-4 px-2 py-0"
                onClick={() => handleMemberClick(member)}
              >
                {renderFields(member)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgMemberList;
