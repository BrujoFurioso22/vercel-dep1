import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { IngresarVenta } from "../../consultasBE/Tablas";
import { ObtenerIDUsuario } from "../../consultasBE/User";

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

const ContenedorMenor = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
`;

const FormulariodeVenta = styled.form`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  .seccionVenta {
    padding: 10px;
    display: flex;
    gap: 10px;
    & > label {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
`;
const VentanaEmergente = styled.div`
  position: absolute;
  background-color: var(--color-6);
  top: 0;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .modal {
    & > * {
      width: 100%;
    }
    background-color: var(--color-negro-bajo);
    margin-top: 30px;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: var(--sombra-intensa);
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > .titulo {
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
    }
  }
  .gridDatos {
    display: grid;
    grid-template-columns: 1fr 1fr; /* O 1fr 1fr, dependiendo de cómo desees distribuir el espacio */
    align-items: start;
    gap: 10px;
    padding: 10px;
    width: 100%; /* Divide el contenedor en dos columnas */
    .dato {
      display: contents; /* Esto permite que cada span actúe como si estuviera directamente en la grilla */
      .dato1 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
      }
    }
  }

  .contenedorBotones {
    display: flex;
    grid-column: 1 / -1;
    justify-content: center;
    gap: 10px;
    align-items: center;
    width: 100%;
    & > button {
      padding: 5px 10px;
      border: none;
      outline: none;
      border-radius: 5px;
      cursor: pointer;
      &.cancelar {
        border: solid 2px var(--alerta-error);
        color: var(--alerta-error);
      }
      &.confirmar {
        border: solid 2px var(--alerta-exito);
        color: var(--alerta-exito);
      }
    }
  }
`;

const InputField = styled.input`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
`;
const SelectCampo = styled.select`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
`;

const BotonSubmit = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-1);
  color: var(--color-blanco);
  margin-top: 15px;
  cursor: pointer;
`;

const ContenedorContenido = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const CuadroInfo = (data1, data2) => {
  return <ContenedorMenor></ContenedorMenor>;
};
const EditarInformacion = () => {
  const [data1,setData1]=useState({
    premio1:"$300",
    premio2:"$180",
    premio3:"$130",
    premios:[],
    fecha:"",
    hora:"",
    
  });
  return (
    <ContenedorContenido>
      <ContenedorMenor>dsd</ContenedorMenor>
    </ContenedorContenido>
  );
};

const EditInfoTemplates = () => {
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <div style={{ height: "100%" }}>
          <EditarInformacion />
        </div>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default EditInfoTemplates;
