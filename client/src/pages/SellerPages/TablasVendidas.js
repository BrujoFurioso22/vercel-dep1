import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import GeneratePdfButton, {
  downloadPdf,
} from "../../components/pdfMaker/pdfMaker";
import { device } from "../../components/styled-componets/MediaQ";
import { ConsultarVentas } from "../../consultasBE/Tablas";
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
  overflow: auto;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
`;

const Contenedor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: auto;
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
const headerNames = {
  id: "ID Venta",
  idcliente: "ID Cli.",
  nombre: "Cliente",
  fecha: "Fecha",
  cantidadnormal: "# 1",
  cantidadrapida: "# 2",
  numerotransaccion: "Num Tr",
  cantidadinero: "$ Tr.",
};

const visibleColumns = {
  id: false,
  idcliente: true,
  nombre: true,
  fecha: true,
  numerotransaccion: true,
  cantidadinero: true,
};
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
function formatDate(dateString) {
  const date = new Date(dateString); // Parsear la fecha
  const day = String(date.getDate()).padStart(2, "0"); // Día en formato 2 dígitos
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes en formato 2 dígitos
  const year = date.getFullYear(); // Año

  return `${day}/${month}/${year}`; // Devolver en formato dd/mm/yyyy
}
const CardTable = ({ datos, headerNames, visibleColumns }) => {
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
          <GeneratePdfButton idventa={parseInt(fila.id)} />
        </div>
      ))}
    </TablaCard>
  );
};

const Tablas = ({ datos }) => {
  // console.log(datos);
  const flatDatos = datos.flat();
  const headers = Object.keys(flatDatos[0]).filter(
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
            {flatDatos.map((venta, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td
                    data-label={headerNames[header]}
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
                  <GeneratePdfButton idventa={parseInt(venta.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </TablaPersonalizada>
        <CardTable
          datos={flatDatos}
          headerNames={headerNames}
          visibleColumns={visibleColumns}
        />
      </Contenedor1>
    </>
  );
};

const TablasVendidas = () => {
  const idv = localStorage.getItem("id");
  const [datosTabla, setDatosTabla] = useState(null);
  const [datosAplanados, setDatosAplanados] = useState(null);
  const [datosFiltrados, setDatosFiltrados] = useState(null);

  const [busqueda, setBusqueda] = useState("");

  const ConsultarTablasVendedor = async () => {
    const idVendedor = await ObtenerIDUsuario(idv);
    if (idVendedor.data.id) {
      const res = await ConsultarVentas(idVendedor.data.id);
      // console.log(res.data.data);
      console.log(res);

      if (res.data) {
        setDatosTabla(res.data.data);
      } else {
        setDatosTabla([]);
      }
    }
  };
  useEffect(() => {
    ConsultarTablasVendedor();
  }, []);

  useEffect(() => {
    if (datosTabla !== null) {
      if (datosTabla.length !== 0) {
        // console.log(datosTabla);
        let var2 = datosTabla.flat();
        setDatosAplanados(var2);
        let var3 = var2.filter((venta) =>
          Object.values(venta).some((valor) =>
            valor?.toString().toLowerCase().includes(busqueda.toLowerCase())
          )
        );
        // console.log(var3);
        setDatosFiltrados(var3);
      }
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
        <ContenedorBuscar>
          <span>Buscar:</span>
          <input
            className="buscarInput"
            type="text"
            value={busqueda}
            onChange={manejarCambioBusqueda}
          />
        </ContenedorBuscar>
        {datosTabla === null || datosFiltrados === null ? (
          <div>Cargando Datos...</div>
        ) : datosTabla.length === 0 ? (
          <div>No existen ventas</div>
        ) : datosFiltrados !== null && datosFiltrados.length === 0 ? (
          <div>No se encontraron coincidencias</div>
        ) : (
          <Tablas datos={datosFiltrados} />
        )}
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default TablasVendidas;
