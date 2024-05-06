import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { ConsultarTablasSegunIDTabla } from "../../consultasBE/Tablas";
import { EstructuraTabla1 } from "../UserPages/EstructuraTabla1";
import { EstructuraTabla2 } from "../UserPages/EstructuraTabla2";
import { ObtenerUsuarioPorCC } from "../../consultasBE/User";

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
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const InputField = styled.input`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
  width: 100%;
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
const TablaDatos = styled.div`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  border-radius: 5px;
  display: flex;
  gap: 5px;
  flex-direction: column;

  & > .fila {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
const def = {
  nombre: "",
  cc: "",
  ps: "",
};

const VerificarCodigo = ({ cedulacelular, setCodigo }) => {
  const [verif, setVerif] = useState(false);
  const [seConsulto, setSeConsulto] = useState(false);
  const [data, setData] = useState(def);

  const BuscarTabla = async () => {
    setVerif(true);
    const resp = await ObtenerUsuarioPorCC(cedulacelular);
    setSeConsulto(true);
    // console.log(resp);
    if (resp) {
      if (resp.data) {
        let nombre = resp.data.nombre;
        let cc = resp.data.cc;
        let ps = resp.data.password;
        setData((prevData) => ({
          ...prevData,
          nombre: nombre, // Actualizar el campo correspondiente
          cc: cc, // Actualizar el campo correspondiente
          ps: ps, // Actualizar el campo correspondiente
        }));
        // console.log(resp.data);
      }
    }
    setVerif(false);
  };

  const handleCodigoChange = (value) => {
    let cod = value.toUpperCase().trim();

    setCodigo(cod);
    limpiar();
  };

  const limpiar = () => {
    setVerif(false);
    setSeConsulto(false);
    setData(def);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <Contenedor1>
        
      </Contenedor1>
    </div>
  );
};

const Jugadas = () => {
  const [codigoConsulta, setCodigoConsulta] = useState("");
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Juegos Actuales</h1>
        <VerificarCodigo
          cedulacelular={codigoConsulta}
          setCodigo={setCodigoConsulta}
        ></VerificarCodigo>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default Jugadas;
