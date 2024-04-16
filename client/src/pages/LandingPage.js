import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const ContenedorPadre = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;  
`;

function LandingPage() {
  return (
    <ContenedorPadre>
      <Header/>
      <h1>Bienvenido a Nuestra Aplicación</h1>
      <Link to="/login">Iniciar Sesión</Link>
    </ContenedorPadre>
  );
}

export default LandingPage;
