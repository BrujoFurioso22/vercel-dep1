import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { EstructuraTabla1 } from "./EstructuraTabla1";
import { dataTabla, dataTabla2 } from "./data";
import { EstructuraTabla2 } from "./EstructuraTabla2";

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

const ContenedorTablas = styled.div`
  display: flex;
  gap: 15px;
`;

const Tablas = () => {
  const datos = dataTabla;
  const datos1 = dataTabla2;
  console.log(dataTabla);
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <ContenedorTablas>
          {datos.map((data, idx) => (
            <EstructuraTabla1 dataTables={data} key={idx} />
          ))}
        </ContenedorTablas>
        <ContenedorTablas>
          {datos1.map((data, idx) => (
            <EstructuraTabla2 dataTables={data} key={idx} />
          ))}
        </ContenedorTablas>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default Tablas;
