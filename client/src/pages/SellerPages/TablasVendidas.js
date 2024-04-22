import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import GeneratePdfButton, {
  downloadPdf,
} from "../../components/pdfMaker/pdfMaker";
import { device } from "../../components/styled-componets/MediaQ";
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

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

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
  @media (max-width: 700px) {
    display: none;
    /* table {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 0;
      padding: 0;
    }

    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
      width: 45%; 
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
    }

    td {
      display: block; 
      text-align: left; 
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    td:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      margin-right: 10px;
    }

    td:last-child {
      border-bottom: 0;
    } */
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
  {
    idVenta: "V004",
    idVendedor: "Vend165",
    idCliente: "C423",
    nombreCliente: "Maerie Castro",
    fechaDeVenta: "2024-04-22",
    CantJuego1: 7,
    CantJuego2: 5,
  },
];
const headerNames = {
  idVenta: "ID Venta",
  idVendedor: "ID Ven.",
  idCliente: "ID Cli.",
  nombreCliente: "Cliente",
  fechaDeVenta: "Fecha",
  CantJuego1: "# 1",
  CantJuego2: "# 2",
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

const TablaCard = styled.div`
  @media (min-width: 701px) {
    display: none;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .fila {
    display: flex;
    flex-direction: column;
    width: 48%; /* Permite dos tarjetas por fila */
    margin: 1% 0.5%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: #fff;
    padding: 5px 10px;
    box-sizing: border-box;
  }

  .celda {
    padding: 2px;
    margin: 3px 0;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  .celda:last-child {
    border-bottom: none;
  }

  .celda:before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 10px;
  }
`;
const CardTable = ({ datos, headerNames, visibleColumns }) => {
  // Filtrar las cabeceras que están marcadas como visibles
  const headers = Object.keys(datos[0]).filter(
    (header) => visibleColumns[header] !== false
  );

  return (
    <TablaCard>
      {datos.map((fila, index) => (
        <div key={index} className="fila">
          {headers.map((header) => (
            <div
              key={header}
              className="celda"
              data-label={headerNames[header] || header}
            >
              {fila[header]}
            </div>
          ))}
        </div>
      ))}
    </TablaCard>
  );
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
                  <td
                    data-label={headerNames[header]}
                    key={`${venta.idVenta}-${header}`}
                  >
                    {venta[header]}
                  </td>
                ))}
                <td>
                  <GeneratePdfButton />
                </td>
              </tr>
            ))}
          </tbody>
        </TablaPersonalizada>
        <CardTable
          datos={datos}
          headerNames={headerNames}
          visibleColumns={visibleColumns}
        />
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
