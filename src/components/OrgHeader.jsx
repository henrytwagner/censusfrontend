import React, { useEffect, useState } from 'react';
import '../styles/orgheader.css';
import { useAuthFetch } from '../utils/authFetch';
import sampleImage from '../assets/OrgBackupImage.png';

const OrgHeader = ({ id }) => {
  const authFetch = useAuthFetch();

  const [organizationInfo, setOrganizationInfo] = useState({});
  const [finalImgSrc, setFinalImgSrc] = useState(null);

  useEffect(() => {
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

  if (!organizationInfo || !finalImgSrc) return null;

  return (
    <div className="org-header">
      <div className="org-header-content">
        <div className="org-image">
          <div className="org-image">
            {finalImgSrc ? (
              <img src={finalImgSrc} alt="Org" />
            ) : (
              <div className="org-placeholder" />
            )}
          </div>
        </div>
        <div className="org-info">
          <div className="org-title">{organizationInfo.name}</div>
          <div className="org-desc">{organizationInfo.bio}</div>
        </div>
      </div>
    </div>
  );
};

export default OrgHeader;
