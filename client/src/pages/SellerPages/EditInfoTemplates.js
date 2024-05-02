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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ContenedorMenor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  display: flex;
  gap: 20px;
`;

const ContenedorGrid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  gap: 20px;
  .fila {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    width: fit-content;
  }

  .col-derecha {
    text-align: right;
  }

  .col-izquierda {
    text-align: left;
  }
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

const CuadroInfo = ({ data1, data2, handleChange1, handleChange2 }) => {
  const handlePremiosChange1 = (index, value) => {
    const premiosArray = value.split(",").map((item) => item.trim());
    handleChange1(index, "premios", premiosArray);
  };
  const handlePremiosChange2 = (index, value) => {
    const premiosArray = value.split(",").map((item) => item.trim());
    handleChange2(index, "premios", premiosArray);
  };
  return (
    <ContenedorMenor>
      <ContenedorMenor1>
        <ContenedorGrid>
          {data1.map((dato, indx) => (
            <div key={indx} className="fila">
              <span className="col-derecha">Premio 1:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={dato.premio1}
                  onChange={(e) => handleChange1(0, "premio1", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 2:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={dato.premio2}
                  onChange={(e) => handleChange1(0, "premio2", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 3:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={dato.premio3}
                  onChange={(e) => handleChange1(0, "premio3", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premios:</span>
              <span className="col-izquierda">
                <InputField
                  value={dato.premios.join(", ")}
                  onChange={(e) => handlePremiosChange1(0, e.target.value)}
                />
              </span>
              <span className="col-derecha">Fecha:</span>
              <span className="col-izquierda">
                <InputField
                  value={dato.fecha}
                  onChange={(e) => handleChange1(0, "fecha", e.target.value)}
                />
              </span>
              <span className="col-derecha">Hora:</span>
              <span className="col-izquierda">
                <InputField
                  value={dato.hora}
                  onChange={(e) => handleChange1(0, "hora", e.target.value)}
                />
              </span>
            </div>
          ))}
        </ContenedorGrid>
      </ContenedorMenor1>
      <ContenedorMenor1>
        <ContenedorGrid>
          {data2.map((dato, indx) => (
            <div key={indx} className="fila">
              <span className="col-derecha">Premio 1:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={dato.premio1}
                  onChange={(e) => handleChange2(0, "premio1", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 2:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={dato.premio2}
                  onChange={(e) => handleChange2(0, "premio2", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 3:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={dato.premio3}
                  onChange={(e) => handleChange2(0, "premio3", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premios:</span>
              <span className="col-izquierda">
                <InputField
                  value={dato.premios.join(", ")}
                  onChange={(e) => handlePremiosChange2(0, e.target.value)}
                />
              </span>
              <span className="col-derecha">Fecha:</span>
              <span className="col-izquierda">
                <InputField
                  value={dato.fecha}
                  onChange={(e) => handleChange2(0, "fecha", e.target.value)}
                />
              </span>
              <span className="col-derecha">Hora:</span>
              <span className="col-izquierda">
                <InputField
                  value={dato.hora}
                  onChange={(e) => handleChange2(0, "hora", e.target.value)}
                />
              </span>
            </div>
          ))}
        </ContenedorGrid>
      </ContenedorMenor1>
      <BotonSubmit>Guardar Cambios</BotonSubmit>
    </ContenedorMenor>
  );
};
const EditarInformacion = () => {
  const [data1, setData1] = useState([
    {
      premio1: "300",
      premio2: "180",
      premio3: "130",
      premios: ['licuadora','tostadora'],
      fecha: "10 Mayo 2024",
      hora: "8pm",
    },
  ]);
  const [data2, setData2] = useState([
    {
      premio1: "100",
      premio2: "80",
      premio3: "50",
      premios: [],
      fecha: "10 Mayo 2024",
      hora: "10pm",
    },
  ]);
  const handleChange1 = (index, attr, value) => {
    setData1((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [attr]: value } : item
      )
    );
  };
  const handleChange2 = (index, attr, value) => {
    setData2((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [attr]: value } : item
      )
    );
  };

  return (
    <ContenedorContenido>
      <CuadroInfo
        data1={data1}
        data2={data2}
        handleChange1={handleChange1}
        handleChange2={handleChange2}
      />
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
