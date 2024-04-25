import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import GeneratePdfButton from "../../components/pdfMaker/pdfMaker";
import BingoPdfTemplate from "../../components/pdfMaker/Juego2Template";
import GenerarPDFs from "../../components/pdfMaker/pdfMaker";

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
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
`;

const Contenedor1 = styled.div`
  background-color: var(--color-4);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  & > .buscarCodigo {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;
const InputField = styled.input`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
`;
const ButtonVerif = styled.button`
  outline: none;
  padding: 6px 10px;
  background-color: var(--color-4);

  border: solid 1px var(--color-2);
  color: var(--color-2);
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;

const VerificarCodigo = ({ codigo, setCodigo }) => {
  return (
    <>
      <Contenedor1>
        <div className="buscarCodigo">
          Código:
          <InputField
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <ButtonVerif>Verificar</ButtonVerif>
        </div>
        <GenerarPDFs />
      </Contenedor1>
    </>
  );
};

const ConsultarTablasEnVivo = () => {
  const [codigoConsulta, setCodigoConsulta] = useState("");
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Verifica el código aquí</h1>
        <VerificarCodigo
          codigo={codigoConsulta}
          setCodigo={setCodigoConsulta}
        ></VerificarCodigo>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default ConsultarTablasEnVivo;
