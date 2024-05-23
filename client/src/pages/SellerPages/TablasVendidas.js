import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import GeneratePdfButton from "../../components/pdfMaker/pdfMaker";
import {
  ConsultarVentas,
  ConsultarVentasCliente,
  ConsultarVentasTotales,
} from "../../consultasBE/Tablas";
import { ObtenerIDUsuario } from "../../consultasBE/User";
import GenerarPDFs1 from "../../components/pdfMaker/pdfMakerBack";
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
  overflow: auto;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
`;

const Contenedor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 5px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  overflow: auto;
  & > .buscarCodigo {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;
const Contenedor2 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  height: fit-content;
  padding: 10px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  overflow: auto;
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto auto; /* 4 columnas */
    grid-template-rows: auto auto auto; /* 3 filas */
    gap: 1px; /* Espacio entre celdas */
  }

  .header {
    background-color: #f4f4f4; /* Color de fondo para las cabeceras */
    padding: 2px 7px;
    text-align: center;
    border: 1px solid #ccc; /* Borde para las cabeceras */
  }

  .cell {
    background-color: transparent; /* Color de fondo para las celdas */
    padding: 2px 7px;
    text-align: center;
    /* border: 1px solid #ccc; */
    border: none;
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

  @media (max-width: 700px) {
    display: none;
  }
`;

const ContenedorBuscar = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  & > .buscarInput {
    border: solid 1px var(--color-5);
    border-radius: 5px;
    outline: none;
    padding: 5px;
  }
`;

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
    word-break: break-all;
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

const ContenedorBotones = styled.div`
  display: flex;
  padding: 8px;
  gap: 10px;
  & > span {
    padding: 4px 10px;
    border: solid 1px var(--color-2);
    color: var(--color-2);
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    &.selected {
      background-color: var(--color-2);
      color: white;
    }
  }
`;

const headerNames = {
  id: "ID Venta",
  idcliente: "ID Cli.",
  cc: "Cédula/Teléfono",
  nombre: "Cliente",
  fecha: "Fecha",
  cantidadnormal: "# Tablón",
  cantidadrapida: "# La Única",
  numerotransaccion: "Num Tr",
  cantidadinero: "$ Tr.",
};
const headerNamesClientes = {
  idcliente: "ID Cli.",
  nombre: "Cliente",
  cc: "Cédula/Teléfono",
  cantidadnormal: "# 1",
  cantidadrapida: "# 2",
  cantidadinero: "$ Tr.",
};

const visibleColumns = {
  id: false,
  idcliente: true,
  cc: true,
  nombre: true,
  fecha: true,
  numerotransaccion: true,
  cantidadinero: true,
};
const visibleColumnsClientes = {
  idcliente: true,
  nombre: true,
  cc: true,
  cantidadnormal: true,
  cantidadrapida: true,
  cantidadinero: true,
};
function formatDate(dateString) {
  const date = new Date(dateString); // Parsear la fecha
  const day = String(date.getDate()).padStart(2, "0"); // Día en formato 2 dígitos
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes en formato 2 dígitos
  const year = date.getFullYear(); // Año

  return `${day}/${month}/${year}`; // Devolver en formato dd/mm/yyyy
}
const CardTable = ({ datos, headerNames, visibleColumns, NM }) => {
  // Filtrar las cabeceras que están marcadas como visibles
  const flatDatos = datos.flat();

  const headers = Object.keys(flatDatos[0]).filter(
    (header) => visibleColumns[header] !== false
  );

  return (
    <TablaCard>
      {flatDatos.map((fila, index) => (
        <div key={index} className="fila">
          {headers.map((header) => (
            <div
              key={header}
              className="celda"
              data-label={headerNames[header] || header}
            >
              {header === "fecha"
                ? formatDate(fila[header])
                : header === "cantidadinero"
                ? fila[header] !== null
                  ? `$ ${fila[header]}`
                  : "-"
                : header === "numerotransaccion"
                ? fila[header] !== ""
                  ? fila[header]
                  : "-"
                : fila[header]}
            </div>
          ))}
          {/* <GeneratePdfButton idventa={parseInt(fila.id)} /> */}
          {parseInt(fila["cantidadrapida"]) +
            parseInt(fila["cantidadnormal"]) <=
          180 ? (
            <GenerarPDFs1
              idventa={NM === 0 ? parseInt(fila.id) : fila.cc}
              tipo={NM}
            />
          ) : (
            <span style={{fontSize:"12px"}}>Demasiados datos para<br/>generar un PDF</span>
          )}
        </div>
      ))}
    </TablaCard>
  );
};

const Tablas = ({ datos, datosVentas, NM }) => {
  // console.log(datos);
  const flatDatos = datos.flat();
  const headers = Object.keys(flatDatos[0]).filter((header) =>
    NM === 0
      ? visibleColumns[header] !== false
      : visibleColumnsClientes[header] !== false
  );

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Contenedor1>
        <TablaPersonalizada>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>
                  {NM === 0
                    ? headerNames[header] || header
                    : headerNamesClientes[header] || header}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {flatDatos.map((venta, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td
                    data-label={
                      NM === 0
                        ? headerNames[header]
                        : headerNamesClientes[header]
                    }
                    key={`${venta.idVenta}-${header}`}
                  >
                    {header === "fecha"
                      ? formatDate(venta[header])
                      : header === "cantidadinero"
                      ? venta[header] !== null
                        ? `$ ${venta[header]}`
                        : "-"
                      : header === "numerotransaccion"
                      ? venta[header] !== ""
                        ? venta[header]
                        : "-"
                      : venta[header]}
                  </td>
                ))}
                <td>
                  {(parseInt(venta["cantidadrapida"]) +
                    parseInt(venta["cantidadnormal"])) <=
                  180 ? (
                    <GenerarPDFs1
                      idventa={NM === 0 ? parseInt(venta.id) : venta.cc}
                      tipo={NM}
                    />
                  ) : (
                    <span style={{fontSize:"12px"}}>Demasiados datos para<br/>generar un PDF</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TablaPersonalizada>
        <CardTable
          datos={flatDatos}
          headerNames={NM === 0 ? headerNames : headerNamesClientes}
          visibleColumns={NM === 0 ? visibleColumns : visibleColumnsClientes}
          NM={NM}
        />
      </Contenedor1>
      <Contenedor2>
        <div className="grid-container">
          <div className="header"># Ventas</div>
          <div className="header">Normal</div>
          <div className="header">Rápida</div>
          <div className="header">Total</div>
          <div className="header">Vendedor</div>
          <div className="cell">{datosVentas.juegos_normal_vendedor}</div>
          <div className="cell">{datosVentas.juegos_rapida_vendedor}</div>
          <div className="cell">{datosVentas.juegos_total_vendedor}</div>
          <div className="header">Total</div>
          <div className="cell">{datosVentas.total_normal}</div>
          <div className="cell">{datosVentas.total_rapida}</div>
          <div className="cell">{datosVentas.total_juegos}</div>
        </div>
      </Contenedor2>
    </div>
  );
};

const TablasVendidas = () => {
  const idv = localStorage.getItem("id");
  const [datosTabla, setDatosTabla] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar la carga
  const [menuSeleccionado, setMenuSeleccionado] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [dataVentas, setDataVentas] = useState([]);

  const ConsultarTablasVendedor = async (menu) => {
    setIsLoading(true); // Inicia la carga
    try {
      const idVendedor = await ObtenerIDUsuario(idv);
      if (menu === 0) {
        if (idVendedor.data.id) {
          const res = await ConsultarVentas(idVendedor.data.id);
          // console.log(res.data.data);
          setDatosTabla(res.data.data || []);
        }
      } else {
        if (idVendedor.data.id) {
          const res = await ConsultarVentasCliente(idVendedor.data.id);
          // console.log(res);
          if (res.length > 0) {
            setDatosTabla(res || []);
          }
          // setDatosTabla(res.data.data || []);
        }
      }
    } catch (error) {
      console.error("Error al consultar las ventas:", error);
      setDatosTabla([]);
    }
    setIsLoading(false); // Termina la carga
  };

  const ConsultarTablasTotalesVendidas = async () => {
    const idVendedor = await ObtenerIDUsuario(idv);
    if (idVendedor.data.id) {
      let idV = idVendedor.data.id;
      const res = await ConsultarVentasTotales({ id_vendedor: parseInt(idV) });
      if (res !== null) {
        setDataVentas(res);
        // console.log(res);
      }
    }
  };

  useEffect(() => {
    ConsultarTablasVendedor(menuSeleccionado);
    ConsultarTablasTotalesVendidas();
  }, [menuSeleccionado]);

  useEffect(() => {
    if (datosTabla.length > 0) {
      const var2 = datosTabla.flat();
      const var3 = var2.filter((venta) =>
        Object.values(venta).some((valor) =>
          valor?.toString().toLowerCase().includes(busqueda.toLowerCase())
        )
      );
      setDatosFiltrados(var3);
    } else {
      setDatosFiltrados([]);
    }
  }, [busqueda, datosTabla]);

  const manejarCambioBusqueda = (evento) => {
    setBusqueda(evento.target.value);
  };

  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Tus tablas vendidas</h1>
        <ContenedorBotones>
          <span
            className={`${menuSeleccionado === 0 && "selected"}`}
            onClick={() => setMenuSeleccionado(0)}
          >
            Ventas
          </span>
          <span
            className={`${menuSeleccionado === 1 && "selected"}`}
            onClick={() => setMenuSeleccionado(1)}
          >
            Cliente
          </span>
        </ContenedorBotones>
        <ContenedorBuscar>
          <span>Buscar:</span>
          <input
            className="buscarInput"
            type="text"
            value={busqueda}
            onChange={manejarCambioBusqueda}
          />
        </ContenedorBuscar>
        {isLoading ? (
          <div>Cargando...</div>
        ) : datosTabla.length === 0 ? (
          <div>No hay data disponible</div>
        ) : datosFiltrados.length === 0 ? (
          <div>No existen datos según filtro</div>
        ) : (
          <Tablas
            datos={
              menuSeleccionado === 0
                ? datosFiltrados.sort(
                    (a, b) => new Date(b.fecha) - new Date(a.fecha)
                  )
                : datosFiltrados.sort((a, b) =>
                    a.nombre.localeCompare(b.nombre)
                  )
            }
            datosVentas={dataVentas}
            NM={menuSeleccionado}
          />
        )}
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default TablasVendidas;
