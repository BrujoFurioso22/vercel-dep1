import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VerificarUsuario } from "../consultasBE/User";
import { ContenedorPadre } from "../components/styled-componets/ComponentsPrincipales";
import { InputFieldCustom } from "../components/styled-componets/ComponentsPrincipales";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";
import Header from "../components/Header";

const ContenedorLogin = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5%;
`;

const Formulario = styled.form`
  display: flex;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  border: solid 1px var(--borde-ligero);
  box-shadow: var(--sombra-ligera);
  & span {
    font-weight: 700;
    font-size: 1.5rem;
  }
`;

const BotonRegreso = styled.div`
  position: absolute;
  top: var(--altura-header);
  left: 0px;
  padding: 3px 10px 5px 5px;
  border-radius: 0 0 15px 0;
  background-color: var(--color-1);
  & a {
    text-decoration: none;
    color: var(--color-blanco);
  }
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
        navigate("/");
      }
    } else {
      console.log("Error de ingreso");
    }
  };

  return (
    <ContenedorPadre>
      <Header />
      <BotonRegreso>
        <Link to="/">{"<"} Regresar</Link>
      </BotonRegreso>
      <ContenedorLogin>
        <Formulario onSubmit={handleLogin}>
          <span>Inicio de Sesión</span>
          <InputFieldCustom onChange={setEmail} label={"Correo"} />
          <InputFieldCustom onChange={setPassword} label={"Password"} />
          <button type="submit">Iniciar Sesión</button>
        </Formulario>
      </ContenedorLogin>
    </ContenedorPadre>
  );
}

export default Login;
