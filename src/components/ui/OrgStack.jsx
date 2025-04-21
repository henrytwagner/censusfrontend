import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '@utils/authFetch';
import profileImage from '@assets/images/Headshot.png';
import { Link } from 'react-router-dom';

function OrgStack() {
  const authFetch = useAuthFetch();

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await authFetch('/api/organizations/');
        const data = await response.json();
        setOrgs(data);
      } catch (err) {
        console.error('Failed to load users orgs info.');
      }
    };

    fetchOrgs();
  }, []);

  return (
    <div className="flex flex-row h-full">
      {orgs.map((org) => (
        <Link
          to={`/organization/${org.id}/`}
          key={org.id}
          className="aspect-square p-0.5 h-full box-border"
        >
          {org.photo_url ? (
            <img
              className="h-full w-full object-cover object-center border border-gray-300 rounded-md"
              src={org.photo_url}
              alt=""
            />
          ) : (
            <div className="w-full h-full bg-pink-500 text-white text-xl font-bold flex items-center justify-center rounded-md border border-gray-300">
              {org.name}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default OrgStack;
