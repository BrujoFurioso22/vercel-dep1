import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ObtenerUsuario, VerificarUsuario } from "../consultasBE/User";
import { ContenedorPadre } from "../components/styled-componets/ComponentsPrincipales";
import { InputFieldCustom } from "../components/styled-componets/ComponentsPrincipales";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";

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
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const users = await VerificarUsuario(email, password);
    if (users.data) {
      if (users.data.exists === true) {
        console.log("Ingresado Correctamente");
        login(email);
        navigate("/user");
      }
    } else {
      console.log("Error de ingreso");
    }
  };

  return (
    <ContenedorPadre>
      <BotonRegreso>
        <Link to="/">Regresar</Link>
      </BotonRegreso>
      <ContenedorLogin>
        <Formulario onSubmit={handleLogin}>
          <h1>Inicio de Sesión</h1>
          <InputFieldCustom onChange={setEmail} label={"Correo"} />
          <InputFieldCustom onChange={setPassword} label={"Password"} />
          <button type="submit">Iniciar Sesión</button>
        </Formulario>
      </ContenedorLogin>
    </ContenedorPadre>
  );
}

export default Login;
