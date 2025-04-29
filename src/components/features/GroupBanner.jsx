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
    <div className="flex justify-center items-center w-150 lg:w-2/3  h-fit shadow-md border-1 border-gray-300 rounded-lg">
      <div className="flex flex-col w-full items-between justify-between gap-3 flex-1 ">
        {/* Top Side*/}
        <div className="flex flex-row w-full justify-between items-center gap-1 h-24 flex-1 text-gray-900">
          <div className="flex flex-row justify-between items-center w-full px-4">
            <div className="text-4xl font-light">{organizationInfo.name}</div>
            <div className="flex flex-row gap-4">
              <div className="bg-gray-300 h-6 w-6"></div>
              <div className="bg-gray-300 h-6 w-6"></div>
              <div className="bg-gray-300 h-6 w-6"></div>
            </div>
          </div>

          <div className="w-20 h-20 rounded-lg shadow-md overflow-hidden flex items-center justify-center shrink-0">
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
        </div>

        {/* Right Side*/}

        <div className=" text-sm font-light leading-[1.15] p-4">
          {organizationInfo.bio}
        </div>
      </div>
    </div>
  );
};

export default GroupBanner;
