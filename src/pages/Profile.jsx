import React, { useState, useEffect } from 'react';
import ProfileForm from '@components/forms/ProfileForm';
import { useAuthFetch } from '@utils/authFetch';

const Profile = () => {
  const authFetch = useAuthFetch();
  const [me, setMe] = useState({});

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await authFetch('/api/users/me/');
        const data = await response.json();
        setMe(data);
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };
    fetchMe();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <ProfileForm />
    </div>
  );
};

export default Profile;
