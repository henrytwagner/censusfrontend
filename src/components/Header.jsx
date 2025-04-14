import React, { useEffect, useState } from 'react';
import OrgStack from './OrgStack';
import '../styles/header.css';
import profileImage from '../assets/Headshot.png';
import { useAuthFetch } from '../utils/authFetch';

function Header() {
  const authFetch = useAuthFetch();

  const [me, setMe] = useState({});

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await authFetch('api/users/me/');
        const data = await response.json();
        setMe(data);
      } catch (err) {
        console.error('Failed to load logged user info.');
      }
    };

    fetchMe();
  }, {});

  return (
    <header className="header">
      <div className="left">
        <OrgStack />
      </div>
      <div className="center" style={{ fontSize: '40px', fontWeight: 100 }}>
        CENSUS
      </div>
      <div className="right flex flex-row items-center gap-2">
        <div className="rounded-full h-full aspect-square overflow-hidden">
          {!me ? (
            <img
              className="h-full w-full object-cover object-center"
              src={profileImage}
              // src={me.profile.profile_image_url}
              alt=""
            />
          ) : (
            <div className="w-full h-full bg-blue-700 text-white text-xl font-bold text-center content-center">
              HW
            </div>
          )}
        </div>
        <p className="text-5xl">☰</p>
      </div>
    </header>
  );
}

export default Header;
