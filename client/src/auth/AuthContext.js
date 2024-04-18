import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const login = (id,rol) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("id", id);
    localStorage.setItem("rol", rol);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("id");
    localStorage.removeItem("rol");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
