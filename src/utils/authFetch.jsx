import { useContext } from 'react';
import { AuthContext } from '@state/AuthContext';

export const useAuthFetch = () => {
  const { accessToken, refreshAccessToken, logout } = useContext(AuthContext);

  const authFetch = async (url, options = {}) => {
    let token = accessToken;

    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (!newToken) {
        logout();
        throw new Error('Unable to refresh token. Logged out.');
      }

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        },
      });
    }
    return response;
  };
  return authFetch;
};
