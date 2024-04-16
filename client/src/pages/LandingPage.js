import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContenedorPadre = styled.div`
  display: flex;
  position: relative;
  width: 100px;
`;

function LandingPage() {
  return (
    <ContenedorPadre>
      <h1>Bienvenido a Nuestra Aplicación</h1>
      <Link to="/login">Iniciar Sesión</Link>
    </ContenedorPadre>
  );
}

export default LandingPage;
