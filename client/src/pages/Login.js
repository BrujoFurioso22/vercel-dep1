import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí iría la lógica de autenticación
    // Simulación de asignación de rol
    const roles = { 'admin': '/admin', 'seller': '/seller', 'user': '/user' };
    const role = roles[user]; // 'user' sería determinado por la autenticación real
    navigate(role);
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Usuario:
        <input type="text" onChange={(e) => setUser(e.target.value)} />
      </label>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
