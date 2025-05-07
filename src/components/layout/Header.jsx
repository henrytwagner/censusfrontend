import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrgStack from '@components/ui/OrgStack';
import { useAuthFetch } from '@utils/authFetch';
import contactsImage from '@assets/images/ContactsInvert.png';
import HomeIcon from '../ui/HomeIcon';

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
      <div className="flex justify-start items-center flex-1 h-fit gap-4">
        <Link
          to={'/'}
          //   className="aspect-square h-full flex items-center justify-center border-r-2"
          // >
          //   <HomeIcon />

          //   className="w-fit pr-4 h-12 flex items-center justify-center border-r-1 border-gray-500"
          // >
          //   CONTACTS

          className="w-16 pr-4 h-12 flex items-center justify-center border-r-1 border-gray-500"
        >
          <img className="h-8 dark:invert" src="/censusIcon.003.png" alt="" />
        </Link>
        {me && <OrgStack />}
      </div>
      {/* Center section */}
      <Link
        to={'/landing'}
        className="flex justify-center shrink-0 items-center flex-1 h-[50px] text-[40px] font-thin"
      >
        <img className="h-6 shrink-0" src="/censusLogo.002.png" alt="" />
      </Link>
      {/* Right section */}
      <div className="flex justify-end items-center flex-1 h-[50px] gap-2">
        <Link
          to={'/profile'}
          className="rounded-full h-full aspect-square overflow-hidden"
        >
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
        </Link>
        <p className="text-5xl">☰</p>
      </div>
    </header>
  );
}

export default Header;
