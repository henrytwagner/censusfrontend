import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '@utils/authFetch';
import sampleImage from '@assets/images/ContactsInvert.png';

const GroupBanner = ({ id }) => {
  const authFetch = useAuthFetch();

  const [organizationInfo, setOrganizationInfo] = useState({});
  const [finalImgSrc, setFinalImgSrc] = useState(null);

  useEffect(() => {
    if (!id) {
      // Hardcode default values when no ID is provided
      setOrganizationInfo({
        name: 'Default Organization',
        bio: 'This is a default organization description.',
      });
      setFinalImgSrc(sampleImage);
      return;
    }

    // Fetch organization info if ID is provided
    const fetchOrganizationInfo = async () => {
      try {
        const response = await authFetch(`/api/organizations/${id}`);
        const data = await response.json();
        setOrganizationInfo(data);
      } catch (err) {
        console.error('Failed to load organization');
      }
    };

    fetchOrganizationInfo();
  }, [id]);

  useEffect(() => {
    if (!organizationInfo?.photo_url) return;

    const img = new Image();
    img.src = organizationInfo.photo_url;

    img.onload = () => setFinalImgSrc(organizationInfo.photo_url);
    img.onerror = () => setFinalImgSrc(sampleImage);
  }, [organizationInfo]);

  // if (!organizationInfo || !finalImgSrc) return null; // Commented to reduce glitch in between contact and org page

  return (
    <div className="flex justify-center items-start w-1/2 rounded-2xl shadow-md">
      <div className="flex items-center justify-start flex-1">
        <div className="w-64 h-64 rounded-lg shadow-md overflow-hidden flex items-center justify-center">
          {finalImgSrc ? (
            <img
              src={finalImgSrc}
              alt="Org"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-64 h-64" />
          )}
        </div>
        <div className="flex flex-col justify-center items-start gap-1 h-24 px-6 flex-1">
          <div className="text-gray-400 text-5xl font-light">
            {organizationInfo.name}
          </div>
          <div className="text-gray-400 text-sm font-light leading-[1.15]">
            {organizationInfo.bio}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBanner;
