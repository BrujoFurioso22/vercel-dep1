import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function AdminPR({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const rol = localStorage.getItem("rol") ?? "99";

  if (!isAuthenticated) {
    // Redirigir a Login, recordando la última ubicación
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (rol !== "57") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
