import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const ContenedorPadre = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;  
`;

function LandingPage() {
  return (
    <ContenedorPadre>
      <Header/>
      <h1>Bienvenido a Nuestra Aplicación</h1>
    </ContenedorPadre>
  );
}

export default LandingPage;
