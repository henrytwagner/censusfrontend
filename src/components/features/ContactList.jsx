import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '../../utils/authFetch';
import SearchBar from '@components/ui/SearchBar';
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

const ContactList = ({
  listType,
  fetchUrl,
  groupByField,
  headerFields,
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
    navigate(
      `${navigateTo}?${listType === 'users' ? 'userId' : 'contactId'}=${member.id}&contactType=${
        listType === 'userList' ? 'user' : 'contact'
      }`
    );
  };

  return (
    <div className="w-150 lg:w-2/3 h-fit flex flex-col text-lg">
      <SearchBar />
      <div>
        <div className="flex items-center justify-start gap-4 px-2 py-0 border-b-1 border-b-gray-300 mb-2 text-gray-500 font-light p-2">
          {headerFields}
        </div>
        {sortedKeys.map((key) => (
          <div key={key}>
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

export default ContactList;
