import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import {
  ConsultarTablasSegunIDTabla,
  CrearNuevaJugada,
  FinalizarJugada,
  ObtenerJugadas,
  ObtenerTablasGanadoras,
  ObtenerTablasLetrasGanadoras,
  UpdateJugada,
} from "../../consultasBE/Tablas";
import { EstructuraTabla1 } from "../UserPages/EstructuraTabla1";
import { EstructuraTabla2 } from "../UserPages/EstructuraTabla2";
import { ObtenerUsuarioPorCC } from "../../consultasBE/User";

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow-y: auto;
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
  grid-template-columns: repeat(13, 1fr);
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

const BotonFinalizarJuego = styled.button`
  padding: 7px 20px;
  outline: none;
  border-radius: 10px;
  width: fit-content;
  border: none;
  background-color: var(--color-2);
  color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const ContenedorJugadas = ({
  data,
  setData,
  consulta,
  setTablaLlena,
  setLetrasTabla,
}) => {
  const [seguro, setSeguro] = useState(0);
  let posiciones = [];

  if (data !== null) {
    posiciones = data.data;
    posiciones = JSON.parse(posiciones);
  }

  // Función para manejar el clic en un círculo
  const handleClick = async (posicion) => {
    if (posiciones) {
      // Copiar el arreglo actual de posiciones
      const newPositions = [...posiciones];
      // Cambiar el estado del círculo clicado
      newPositions[posicion] = !newPositions[posicion];
      let data1 = JSON.stringify(newPositions);

      const res = await UpdateJugada({ id: data.id, data: data1 });
      if (res) {
        await consulta();
      }
      // const resTablaLlena = await ObtenerTablasGanadoras();
      // setTablaLlena(resTablaLlena);
      // console.log(resTablaLlena);

      // const resTablaLetras = await ObtenerTablasLetrasGanadoras();
      // setLetrasTabla(resTablaLetras);
      // console.log(resTablaLetras);

      // Actualizar el estado de 'data' con el nuevo arreglo de posiciones
      // setData({ ...data, data: newPositions });
    }
  };

  const CrearJuego = async () => {
    let dataA = [];
    for (let i = 0; i <= 74; i++) {
      dataA[i] = false;
    }
    let data = JSON.stringify(dataA);
    // console.log(data);

    const res = await CrearNuevaJugada({ data });
    if (res) {
      setData(res);
    }
  };

  const FinJugada = async () => {
    const res = await FinalizarJugada({ id: data.id });
    if (res) {
      setSeguro(0);
      setTablaLlena([]);
      setLetrasTabla({});
      await consulta();
    }
  };
  function formatearFechaLegible(fechaISO) {
    const opciones = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-ES", opciones);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {data !== null ? (
        <Contenedor1>
          <span>
            Fecha Jugada: <em> {formatearFechaLegible(data.fecha_hora)} </em>
          </span>
          <GridContainer>
            {Object.entries(posiciones).map(([posicion, marcada]) => (
              <Circle
                key={posicion}
                marked={marcada}
                onClick={() => handleClick(posicion)} // Manejar el clic
                clicked={marcada}
              >
                {parseInt(posicion) + 1}
              </Circle>
            ))}
          </GridContainer>
          {seguro === 0 ? (
            <BotonFinalizarJuego onClick={() => setSeguro(1)}>
              Finalizar Juego
            </BotonFinalizarJuego>
          ) : (
            <div>
              <span>Seguro quiere finalizar el juego?</span>
              <div style={{ display: "flex", padding: "0 10px", gap: "10px" }}>
                <BotonFinalizarJuego onClick={FinJugada}>
                  Si
                </BotonFinalizarJuego>
                <BotonFinalizarJuego
                  style={{ backgroundColor: "transparent", color: "black" }}
                  onClick={() => setSeguro(0)}
                >
                  No
                </BotonFinalizarJuego>
              </div>
            </div>
          )}
        </Contenedor1>
      ) : (
        <Contenedor1>
          <BotonFinalizarJuego onClick={CrearJuego}>
            Nuevo Juego <i className="bi bi-plus-circle-dotted" />{" "}
          </BotonFinalizarJuego>
        </Contenedor1>
      )}
    </div>
  );
};

const GridContainerTab1 = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: fit-content;
  max-width: 250px;
  gap: 6px;
  padding: 5px;
  .gridItem {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    background-color: #f9f9f9;
  }

  .title {
    color: #333;
    margin: 0;
  }
  .DataList {
    padding-left: 5px;
  }

  .NoDataText {
    color: #666;
    font-style: italic;
  }
`;

const GridComponent1 = ({ items }) => {
  return (
    <GridContainerTab1>
      {items
        .filter((item) => item.datos.length > 0)
        .map((item) => (
          <div className="gridItem" key={item.numeral}>
            <div className="DataList">
              {"["}
              {item.numeral}
              {"]: "}
              {item.datos.join(", ")}
            </div>
          </div>
        ))}
    </GridContainerTab1>
  );
};

const GridComponent2 = ({ data }) => {
  return (
    <GridContainerTab1>
      {Object.entries(data)
        .filter(([, value]) => value.tablas && value.tablas.length > 0)
        .map(([key, value]) => (
          <div className="gridItem" key={key}>
            <span className="title">
              {"["}
              {key}
              {"]: "}
              {value.tablas.join(", ")}
            </span>
          </div>
        ))}
    </GridContainerTab1>
  );
};

const Jugadas = () => {
  const initialPositions = {};
  for (let i = 1; i <= 75; i++) {
    initialPositions[i] = false;
  }
  const [data, setData] = useState(null);
  const [dataTotales, setDataTotales] = useState([]);
  const [dataTablasLetas, setTablasLetra] = useState({});

  const ConsultarJugadas = async () => {
    const res = await ObtenerJugadas();
    if (!res) {
      setData(null);
    } else {
      setData(res[0]);
    }
    const resTablaLlena = await ObtenerTablasGanadoras();
    if(resTablaLlena.status===200){
      setDataTotales(resTablaLlena);
    }
    console.log(resTablaLlena);

    const resTablaLetras = await ObtenerTablasLetrasGanadoras();
    if(resTablaLetras.status === 200){

      setTablasLetra(resTablaLetras);
    }
    // console.log(res);
  };
  useEffect(() => {
    ConsultarJugadas();
  }, []);

  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Juegos Actuales</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          <ContenedorJugadas
            data={data}
            setData={setData}
            consulta={ConsultarJugadas}
            setTablaLlena={setDataTotales}
            setLetrasTabla={setTablasLetra}
          ></ContenedorJugadas>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {dataTotales.length > 0 && (
              <Contenedor1 style={{ gap: "2px", minWidth: "fit-content" }}>
                <span>Números en Tabla</span>
                <GridComponent1 items={dataTotales} />
              </Contenedor1>
            )}
            {Object.keys(dataTablasLetas).length > 0 && (
              <Contenedor1 style={{ gap: "2px", minWidth: "fit-content" }}>
                <span>Letras en Tabla</span>
                <GridComponent2 data={dataTablasLetas} />
              </Contenedor1>
            )}
          </div>
        </div>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default Jugadas;
