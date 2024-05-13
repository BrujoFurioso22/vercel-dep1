import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { ConsultarTablasSegunIDTabla } from "../../consultasBE/Tablas";
import { EstructuraTabla1 } from "../UserPages/EstructuraTabla1";
import { EstructuraTabla2 } from "../UserPages/EstructuraTabla2";

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
`;

const Contenedor1 = styled.div`
  background-color: var(--color-7);
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
  const [verif, setVerif] = useState(false);
  const [seConsulto, setSeConsulto] = useState(false);
  const [data, setData] = useState([]);
  const [letraTabla, setLetraTabla] = useState("");
  const BuscarTabla = async () => {
    setVerif(true);
    const resp = await ConsultarTablasSegunIDTabla(codigo);
    setSeConsulto(true);

    if (resp.data) {
      let dat = resp.data.data;
      if (dat.length > 0) {
        setData(dat);
        setLetraTabla(dat[0].numtabla.charAt(0));
        console.log(dat);
      }
    }

    setVerif(false);
  };

  const handleCodigoChange = (value) => {
    let cod = value.toUpperCase();
    setCodigo(cod);
    limpiar();
  };

  const limpiar = () => {
    setVerif(false);
    setSeConsulto(false);
    setLetraTabla("");
    setData([]);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"15px"}}>
      <Contenedor1>
        <div className="buscarCodigo">
          Código:
          <InputField
            type="text"
            value={codigo}
            onChange={(e) => handleCodigoChange(e.target.value)}
          />
          {codigo.length > 5 && (
            <ButtonVerif onClick={BuscarTabla}>
              {verif ? "Buscando..." : "Verificar"}
            </ButtonVerif>
          )}
        </div>
      </Contenedor1>
      {seConsulto ? (
        data.length > 0 ? (
          <Contenedor1>
            Tabla Encontrada
            <div>
              {letraTabla === "N" ? (
                <EstructuraTabla1 dataTables={data[0]} />
              ) : (
                <EstructuraTabla2 dataTables={data[0]} />
              )}
            </div>
          </Contenedor1>
        ) : (
          <Contenedor1>
            No se encontro una tabla con el codigo: {codigo}
          </Contenedor1>
        )
      ) : (
        <></>
      )}
    </div>
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
