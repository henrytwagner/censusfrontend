import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrgStack from './OrgStack';
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
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b bg-black text-white border-gray-900 flex-shrink-0">
      {/* Left section */}
      <div className="md:flex md:justify-start md:items-center md:flex-1 h-[50px]"></div>
      {/* Center section */}
      <div className="flex justify-start md:justify-center items-center flex-1 h-[50px] text-[40px] font-thin">
        CENSUS
      </div>
      {/* Right section */}
      <div className="flex justify-end items-center flex-1 h-[50px] gap-2">
        {me.first_name ? (
          <Link
            to="/"
            className="block border border-blue-600 rounded-lg p-2 hover:bg-blue-600 transition-colors"
          >
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold">Go to Contacts</p>
            </div>
          </Link>
        ) : (
          <Link
            to="/login"
            className="block border border-blue-600 rounded-lg p-2 hover:bg-blue-50 transition-colors"
          >
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold">Sign In</p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
