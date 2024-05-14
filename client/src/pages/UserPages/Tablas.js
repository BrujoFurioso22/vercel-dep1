import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { EstructuraTabla1 } from "./EstructuraTabla1";
import { dataTabla, dataTabla2 } from "./data";
import { EstructuraTabla2 } from "./EstructuraTabla2";
import { ConsultarTablasdelCliente } from "../../consultasBE/Tablas";
import GenerarPDFs1 from "../../components/pdfMaker/pdfMakerBack";

// const ContenedorPadre = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   position: relative;
//   width: 100%;
// `;

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow-y: auto;
`;

const ContenedorTablas = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tablas = () => {
  const [d1, setD1] = useState([]);
  const [d2, setD2] = useState([]);
  const ConsultarTablasCliente = async () => {
    const cccliente = localStorage.getItem("id");
    const res = await ConsultarTablasdelCliente({ cccliente: cccliente });
    if (!res) {
    } else {
      setD1(res[0]);
      setD2(res[1]);
    }
  };
  useEffect(() => {
    ConsultarTablasCliente();
  }, []);
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <GenerarPDFs1 tipo={2} />
        {d1.length > 0 && (
          <div>
            <h3>Tablas Normales</h3>
            <ContenedorTablas>
              {d1.map((data, idx) => (
                <EstructuraTabla1 dataTables={data} key={idx} />
              ))}
            </ContenedorTablas>
          </div>
        )}
        {d2.length > 0 && (
          <div>
            <h3>Tablas Rápidas</h3>
            <ContenedorTablas>
              {d2.map((data, idx) => (
                <EstructuraTabla2 dataTables={data} key={idx} />
              ))}
            </ContenedorTablas>
          </div>
        )}
        {d1.length === 0 && d2.length === 0 && <h3>No dispone de tablas</h3>}
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default Tablas;
