import React, { useEffect, useState } from 'react';
import '../styles/orgstack.css';
import { useAuthFetch } from '../utils/authFetch';
import profileImage from '../assets/Headshot.png';

function OrgStack() {
  const authFetch = useAuthFetch();

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await authFetch('api/organizations/');
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
        <div className="aspect-square m-0.5 hover:m-0 h-full rounded-md overflow-hidden">
          {org.photo_url ? (
            <img
              key={org.id}
              className="h-full w-full object-cover object-center"
              src={profileImage}
              // TODO: Update to use real api results
              // src={me.profile.profile_image_url}
              alt=""
            />
          ) : (
            <div
              key={org.id}
              className="w-full h-full bg-pink-500 text-white text-xl font-bold text-center content-center"
            >
              {org.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrgStack;
