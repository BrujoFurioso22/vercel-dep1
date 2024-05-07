import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
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
  display: flex;
  flex-direction: column;
  gap: 15px;
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

const flipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  25% {
    transform: rotateY(90deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  75% {
    transform: rotateY(270deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-gap: 10px;
`;

const Circle = styled.span`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.marked ? "#2ecc71" : "#3498db")};
  color: #fff;
  border-radius: 50%;
  display: flex;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  ${(props) =>
    props.clicked &&
    css`
      animation: ${flipAnimation} 1s ease;
    `};
`;

const BotonFinalizarJuego=styled.button`
  padding: 7px 20px;
  outline: none;
  border-radius: 10px;
  width: fit-content;
  border: none;
  background-color: var(--color-2);
  color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

`

const def = {
  nombre: "",
  cc: "",
  ps: "",
};

const ContenedorJugadas = ({ data, setData }) => {
  const posiciones = data[0].data.posiciones;
  // Función para manejar el clic en un círculo
  const handleClick = (posicion) => {
    // Copiar el estado actual de posiciones
    const newPositions = { ...posiciones };
    // Cambiar el estado del círculo clicado
    newPositions[posicion] = !newPositions[posicion];
    // Actualizar el estado de data
    setData([{ ...data[0], data: { posiciones: newPositions } }]);
    console.log(posiciones);
  };

  const CrearJuego = () => {
    let initialPositions = {};
    for (let i = 1; i <= 75; i++) {
      initialPositions[i] = false;
    }
    console.log(initialPositions);

  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {data[0].estado === "I" ? (
        <Contenedor1>
          <GridContainer>
            {Object.entries(posiciones).map(([posicion, marcada]) => (
              <Circle
                key={posicion}
                marked={marcada}
                onClick={() => handleClick(posicion)} // Manejar el clic
                clicked={marcada}
              >
                {posicion}
              </Circle>
            ))}
          </GridContainer>
          <BotonFinalizarJuego>Finalizar Juego</BotonFinalizarJuego>
        </Contenedor1>
      ) : (
        <Contenedor1>
          <BotonFinalizarJuego onClick={CrearJuego} >
            Nuevo Juego <i className="bi bi-plus-circle-dotted" />{" "}
          </BotonFinalizarJuego>
        </Contenedor1>
      )}
    </div>
  );
};

const Jugadas = () => {
  const initialPositions = {};
  for (let i = 1; i <= 75; i++) {
    initialPositions[i] = false;
  }
  const [data, setData] = useState([
    {
      id: 98,
      fecha: "10/11/2023",
      data: {
        posiciones: initialPositions,
      },

      estado: "I",
    },
  ]);

  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Juegos Actuales</h1>
        <ContenedorJugadas data={data} setData={setData}></ContenedorJugadas>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default Jugadas;
