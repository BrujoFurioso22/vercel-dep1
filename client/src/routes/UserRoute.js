import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function UserRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir a Login, recordando la última ubicación
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
