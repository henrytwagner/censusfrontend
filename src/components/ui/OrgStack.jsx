import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '@utils/authFetch';
import { Link } from 'react-router-dom';

function OrgStack() {
  const authFetch = useAuthFetch();
  const [orgs, setOrgs] = useState([]);
  const [hovered, setHovered] = useState(false);

  const sortByAccess = (arr) =>
    arr
      .slice()
      .sort(
        (a, b) =>
          new Date(b.last_accessed_at || 0) - new Date(a.last_accessed_at || 0)
      );

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await authFetch('/api/organizations/');
        const data = await response.json();
        setOrgs(data);
      } catch {
        console.error('Failed to load users orgs info.');
      }
    };
    fetchOrgs();
  }, []);

  const handleClick = async (clickedId) => {
    // move the clicked org to the end of the array
    await authFetch(`/api/organizations/${clickedId}/access/`, {
      method: 'POST',
    });

    setOrgs((prev) =>
      sortByAccess(
        prev.map((o) =>
          o.id === clickedId
            ? { ...o, last_accessed_at: new Date().toISOString() }
            : o
        )
      )
    );
  };

  const spacing = hovered ? 64 : 16;

  return (
    <div
      className="relative w-40 h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {orgs.map((org, idx) => {
        const offset = idx * spacing; // pixels to fan out by
        return (
          <Link
            key={org.id}
            to={`/organization/${org.id}`}
            onClick={() => handleClick(org.id)}
            className="absolute transition-transform duration-200 ease-out"
            style={{
              top: '50%',
              transform: `translateX(${offset}px) translateY(-50%)`,
              zIndex: 1000 - idx,
            }}
          >
            {org.photo_url ? (
              <img
                src={org.photo_url}
                alt={org.name}
                className="w-16 h-16 object-cover rounded-md border border-gray-300 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 bg-pink-500 text-white text-sm font-bold flex items-center justify-center rounded-md border border-gray-300 shadow-md">
                {org.name}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default OrgStack;
