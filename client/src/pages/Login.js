import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ObtenerUsuario } from "../consultasBE/User";
import { ContenedorPadre } from "../components/styled-componets/ComponentsPrincipales";
import { InputFieldCustom } from "../components/styled-componets/ComponentsPrincipales";
import styled from "styled-components";

const ContenedorLogin = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Formulario = styled.form`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const BotonRegreso = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const users = await ObtenerUsuario();
    console.log(users);
    // Aquí iría la lógica de autenticación
    // Simulación de asignación de rol
    // const roles = { 'admin': '/admin', 'seller': '/seller', 'user': '/user' };
    // const role = roles[user]; // 'user' sería determinado por la autenticación real
    // navigate(role);
  };

  return (
    <ContenedorPadre>
      <BotonRegreso>
        <Link to="/">Regresar</Link>
      </BotonRegreso>
      <ContenedorLogin>
        <Formulario onSubmit={handleLogin}>
          <h1>Inicio de Sesión</h1>
          <InputFieldCustom onChange={setUser} label={"Usuario"} />
          <button type="submit">Iniciar Sesión</button>
        </Formulario>
      </ContenedorLogin>
    </ContenedorPadre>
  );
}

export default Login;