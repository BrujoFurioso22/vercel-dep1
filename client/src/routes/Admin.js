import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ManageUsers from '../pages/AdminPages/ManageUsers';
import AdminSettings from '../pages/AdminPages/AdminSettings';

function Admin() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <nav>
        <Link to="users">Gestionar Usuarios</Link>
        <Link to="settings">Configuraciones</Link>
      </nav>
      <Routes>
        <Route path="users" element={<ManageUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </div>
  );
}

export default Admin;
