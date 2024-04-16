import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Bienvenido a Nuestra Aplicación</h1>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default LandingPage;
