import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Profile from "./Profile";

const UserPage = () => {
  return (
    <div>
      <h1>UserPage</h1>
      <nav>
        <Link to="profile">Ver Perfil</Link>
      </nav>
      <Routes>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default UserPage;
