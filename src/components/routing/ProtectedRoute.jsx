import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@state/AuthContext';

function ProtectedRoute({ children }) {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
