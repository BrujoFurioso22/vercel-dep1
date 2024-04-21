import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";

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

const TablaPersonalizada = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 5px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  th,
  td {
    padding: 12px 15px;
    text-align: center;
    border-bottom: 1px solid #dddddd;
  }

  th {
    background-color: #f4f4f4;
    color: #333333;
    font-weight: bold;
  }

  /* Estilos para las filas: colores alternos y efectos de hover */
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  /* Estilos para botones y controles dentro de la tabla */
  button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  /* Responsive design: Mejorando la visualización en dispositivos móviles */
  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    overflow-x: auto; /* Permite desplazamiento lateral en dispositivos pequeños */

    th,
    td {
      white-space: nowrap; /* Evita que los textos se rompan en dispositivos estrechos */
    }
  }
`;
const datos = [
  {
    idVenta: "V001",
    idVendedor: "Vend123",
    idCliente: "C456",
    nombreCliente: "Jose Manuel Estrada",
    fechaDeVenta: "2024-04-20",
    CantJuego1: 2,
    CantJuego2: 3,
  },
  {
    idVenta: "V002",
    idVendedor: "Vend124",
    idCliente: "C457",
    nombreCliente: "María Estela Gómez",
    fechaDeVenta: "2024-04-21",
    CantJuego1: 1,
    CantJuego2: 2,
  },
  {
    idVenta: "V003",
    idVendedor: "Vend125",
    idCliente: "C458",
    nombreCliente: "Jorge Castro",
    fechaDeVenta: "2024-04-22",
    CantJuego1: 4,
    CantJuego2: 1,
  },
];
const headerNames = {
  idVenta: "ID de Venta",
  idVendedor: "ID del Vendedor",
  idCliente: "ID del Cliente",
  nombreCliente: "Nombre Cliente",
  fechaDeVenta: "Fecha de Venta",
  CantJuego1: "Cantidad de Juego 1",
  CantJuego2: "Cantidad de Juego 2",
};

const visibleColumns = {
  idVenta: false,
  idVendedor: true,
  idCliente: true,
  nombreCliente: true,
  fechaDeVenta: true,
  CantJuego1: true,
  CantJuego2: true,
};

const Tablas = ({ datos }) => {
  const headers = Object.keys(datos[0]).filter(
    (header) => visibleColumns[header] !== false
  );

  return (
    <>
      <Contenedor1>
        <TablaPersonalizada>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{headerNames[header] || header}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datos.map((venta, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={`${venta.idVenta}-${header}`}>{venta[header]}</td>
                ))}
                <td>
                  <button>
                    Descargar <i className="bi bi-download"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </TablaPersonalizada>
      </Contenedor1>
    </>
  );
};

const TablasVendidas = () => {
  const [datosTabla, setDatosTabla] = useState(datos);
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Tus tablas vendidas</h1>
        <Tablas datos={datosTabla} />
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default TablasVendidas;
