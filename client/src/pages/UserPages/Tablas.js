import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { EstructuraTabla } from "./EstructuraTabla";
import { dataTabla } from "./data";

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

const Tablas = () => {
  const datos = dataTabla;
  console.log(dataTabla);
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        
        <EstructuraTabla dataTables={datos}/>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default Tablas;
