import React, { useEffect, useState } from 'react';
import '../styles/orgstack.css';
import { useAuthFetch } from '../utils/authFetch';
import profileImage from '../assets/Headshot.png';
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
  }, {});

  return (
    <div className="orgstack">
      {orgs.map((org) => (
        <Link
          to={`/organization/${org.id}/`}
          key={org.id}
          className="aspect-square m-0.5 hover:m-0 h-full rounded-md overflow-hidden"
        >
          {org.photo_url ? (
            <img
              className="h-full w-full object-cover object-center"
              src={org.photo_url}
              alt=""
            />
          ) : (
            <div className="w-full h-full bg-pink-500 text-white text-xl font-bold text-center content-center">
              {org.name}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default OrgStack;
