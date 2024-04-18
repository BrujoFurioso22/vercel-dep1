import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function SellerPR({ children }) {
  const { isAuthenticated, rol } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir a Login, recordando la última ubicación
    if (rol !== 23) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
