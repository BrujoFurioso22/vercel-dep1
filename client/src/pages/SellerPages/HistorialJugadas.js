import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import { ConsultarHistorialJuegos } from "../../consultasBE/Tablas";

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
    max-width: 500px;
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
  id: "ID",
  estado: "Estado",
  data: "",
  fecha_hora: "Fecha Inicio",
  fecha_finalizacion: "Fecha Final",
  historial: "Historial Números",
  tipo_juego: "Tipo Juego",
  tablas_ganadas: "Ganadas",
};
const visibleColumns = {
  id: true,
  estado: true,
  fecha_hora: true,
  data: false,
  fecha_finalizacion: true,
  historial: true,
  tipo_juego: true,
  tablas_ganadas: true,
};
function formatoLegible(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
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
              {header === "fecha_hora" || header === "fecha_finalizacion"
                ? formatoLegible(fila[header])
                : header === "estado"
                ? fila[header] === "F"
                  ? "Finalizado"
                  : "En Juego"
                : header === "tipo_juego"
                ? fila[header] === 0
                  ? "Normal"
                  : "La Única"
                : fila[header]}
            </div>
          ))}
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
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Contenedor1>
        <TablaPersonalizada>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{headerNames[header] || header}</th>
              ))}
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
                    {header === "fecha_hora" || header === "fecha_finalizacion"
                      ? formatoLegible(venta[header])
                      : header === "estado"
                      ? venta[header] === "F"
                        ? "Finalizado"
                        : "En Juego"
                      : header === "tipo_juego"
                      ? venta[header] === 0
                        ? "Normal"
                        : "La Única"
                      : venta[header]}
                  </td>
                ))}
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
    </div>
  );
};

const HistorialJugadas = () => {
  const idv = localStorage.getItem("id");
  const [datosTabla, setDatosTabla] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar la carga
  // const [busqueda, setBusqueda] = useState("");

  const ConsultarHistorialJuegosFunction = async () => {
    setIsLoading(true); // Inicia la carga
    try {
      const res = await ConsultarHistorialJuegos();
      // console.log(res.data.data);
      setDatosTabla(res || []);
    } catch (error) {
      console.error("Error al consultar historial:", error);
      setDatosTabla([]);
    }
    setIsLoading(false); // Termina la carga
  };

  useEffect(() => {
    ConsultarHistorialJuegosFunction();
  }, []);

  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Historial de Juegos</h1>
        {isLoading ? (
          <div>Cargando...</div>
        ) : datosTabla.length === 0 ? (
          <div>No hay data disponible</div>
        ) : (
          <Tablas
            datos={datosTabla.sort(
              (a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora)
            )}
          />
        )}
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default HistorialJugadas;
