import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem('access')
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem('refresh')
  );

  const login = (access, refresh) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setAccessToken(null);
    setRefreshToken(null);
  };

  const refreshAccessToken = async () => {
    const freshRefresh = localStorage.getItem('refresh');
    if (!freshRefresh) {
      console.warn('No refresh token available');
      return null;
    }

    console.log('[auth] Attempting to refresh token with:', freshRefresh);

    try {
      const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: freshRefresh }),
      });

      if (!response.ok) throw new Error('Refresh failed');

      const data = await response.json();
      console.log('[auth] Token refresh succeeded:', data.access);

      setAccessToken(data.access);
      localStorage.setItem('access', data.access);
      return data.access;
    } catch (err) {
      console.error('[auth] Auto refresh failed', err);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
