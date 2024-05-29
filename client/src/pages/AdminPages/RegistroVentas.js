import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { ConsultarVentas } from "../../consultasBE/Admin";

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  overflow: auto;
  backdrop-filter: blur(7px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const TablaContenedor = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Opcional: sombra para un efecto elevado
`;
const TablaEstilizada = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    text-align: center;
  }

  th:first-child,
  td:first-child {
    border-left: none; // Borde más grueso y oscuro para el primer elemento
  }

  th:last-child,
  td:last-child {
    border-right: none; // Borde más grueso y oscuro para el último elemento
  }

  th {
    background-color: #f4f4f4;
  }
`;

const TablaDinamica = ({ data, columnasOcultas, nombresColumnas }) => {
  const columnas =
    data.length > 0
      ? Object.keys(data[0]).filter((col) => !columnasOcultas.includes(col))
      : [];

  return (
    <TablaContenedor>
      <TablaEstilizada>
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col}>{nombresColumnas[col] || col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((fila, index) => (
              <tr key={index}>
                {columnas.map((col) => (
                  <td key={`${index}-${col}`}>{fila[col] === "" ? "-":fila[col]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length} style={{ textAlign: "center" }}>
                No hay ventas
              </td>
            </tr>
          )}
        </tbody>
      </TablaEstilizada>
    </TablaContenedor>
  );
};

const RegistroVentas = () => {
  const [datos, setDatos] = useState([]);

  const columnasOcultas = [];
  const nombresColumnas = {
    name: "VENDEDOR",
    alias: "ALIAS",
    total_normal: "# TABLÓN",
    total_rapida: "# LA ÚNICA",
    total_juegos: "TOTAL",
  };

  const ConsultaVentasVendedores = async () => {
    const respuesta = await ConsultarVentas();
    console.log(respuesta);
    setDatos(respuesta);
  };
  useEffect(() => {
    ConsultaVentasVendedores();
  }, []);
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <Contenedor1>
          <TablaDinamica
            data={datos}
            columnasOcultas={columnasOcultas}
            nombresColumnas={nombresColumnas}
          />
        </Contenedor1>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default RegistroVentas;
