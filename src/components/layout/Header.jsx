import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrgStack from '@components/ui/OrgStack';
import { useAuthFetch } from '@utils/authFetch';
import contactsImage from '@assets/images/ContactsInvert.png';

function Header() {
  const authFetch = useAuthFetch();
  const [me, setMe] = useState({});

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await authFetch('/api/users/me/');
        const data = await response.json();
        setMe(data);
      } catch (err) {
        console.error('Failed to load logged user info.');
      }
    };

    fetchMe();
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
      {/* Left section */}
      <div className="flex justify-start items-center flex-1 h-20">
        <Link
          to={'/'}
          className="aspect-square m-0.5 hover:m-0 h-full rounded-md overflow-hidden"
        >
          <img
            className="h-full w-full object-cover object-center"
            src={contactsImage}
            alt=""
          />
        </Link>
        {me && <OrgStack />}
      </div>
      {/* Center section */}
      <div className="flex justify-center items-center flex-1 h-[50px] text-[40px] font-thin">
        CENSUS
      </div>
      {/* Right section */}
      <div className="flex justify-end items-center flex-1 h-[50px] gap-2">
        <div className="rounded-full h-full aspect-square overflow-hidden">
          {me.profile_image_url ? (
            <img
              className="h-full w-full object-cover object-center"
              src={me.profile_image_url}
              alt=""
            />
          ) : (
            <div className="w-full h-full bg-blue-700 text-white text-xl font-bold flex items-center justify-center">
              {me.first_name && me.last_name
                ? me.first_name[0] + me.last_name[0]
                : ''}
            </div>
          )}
        </div>
        <p className="text-5xl">☰</p>
      </div>
    </header>
  );
}

export default Header;
