import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [rol, setRol] = useState(() => localStorage.getItem("rol"));

  const login = (id, rol) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("id", id);
    localStorage.setItem("rol", rol);
    setIsAuthenticated(true);
    setRol(rol);
  };
  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("id");
    localStorage.removeItem("rol");

    setIsAuthenticated(false);
    setRol(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
