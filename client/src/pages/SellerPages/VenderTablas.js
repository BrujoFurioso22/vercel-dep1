import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";

// const ContenedorPadre = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   position: relative;
//   width: 100%;
// `;

const ContenedorPagina = styled.div`
  margin-top: var(--altura-header);
  position: relative;
  height: 100%;

  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
`;

const VenderTablas = () => {
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Vender</h1>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default VenderTablas;
