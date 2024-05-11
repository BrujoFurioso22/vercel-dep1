import { EstructuraTabla1 } from "./EstructuraTabla1.js";
// import logo from "./FondoTabla1.png";
import LetrasGrid from "./LetrasGrid.js";
// import "./css/template1.css";

export const htmlTemplate1 = ({ dataJuego, dataInfo, nombreRes }) => {
  function formatearFechaConHora(fechaISO) {
    const opciones = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const fecha = new Date(fechaISO);
    const fechaFormateada = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );
    return fechaFormateada.replace(" a. m.", " AM").replace(" p. m.", " PM");
  }

  const premiosContent = dataInfo[0].premios
    .map((item, idx) => `<div key="${idx}">${item}</div>`)
    .join("");
  const juegoContent = dataJuego
    .map(
      (data, idx) => `
    <div class="bingo-card" key="${idx}">
      <div class="bingo-table">${EstructuraTabla1({ dataTables: data })}</div>
    </div>
  `
    )
    .join("");

  return `
  <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/et1.css">
        <link rel="stylesheet" href="/css/letrasGrid.css">
        <link rel="stylesheet" href="/css/template1.css">
        <title>El Gran Bingo Chabelita</title>
      </head>
      <body>
    <div class="page">
      <div class="header">
        <h4>EL GRAN BINGO CHABELITA</h4>
        <div class="header-body">
          <div class="c1-header">
            <img src="/server/public/FondoTabla1.png" alt="Logo" />
          </div>
          <div class="c2-header">
            ${
              dataInfo[0].premios.length > 0
                ? `
              <div>
                <div class="c2-tit">Premios adicionales:</div>
                <div class="c2-content">${premiosContent}</div>
              </div>
            `
                : ""
            }
            <div>
              <div>Las letras a jugar son: ${dataInfo[0].letras.join(
                ", "
              )}</div>
              <div>Ganancia por letra: $20</div>
            </div>
          </div>
          <div class="c3-header">
            <h3>1era Tabla Llena: $${dataInfo[0].premio1}</h3>
            <span>2da Tabla Llena: $${dataInfo[0].premio2}</span>
            <span>3ra Tabla Llena: $${dataInfo[0].premio3}</span>
            <span>Se jugará el ${formatearFechaConHora(
              dataInfo[0].fecha_hora
            )}</span>
          </div>
        </div>
      </div>
      <div class="body">
        ${LetrasGrid({ letras: dataInfo[0].letras })}
        <div class="bingo-container-u">${juegoContent}</div>
      </div>
      <div class="footer">---------- Vendida por: ${nombreRes} ----------</div>
    </div>
    </body>
    </html>
  `;
};
