import { EstructuraTabla1 } from "./EstructuraTabla1.js";
import LetrasGrid from "./LetrasGrid.js";

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
      <div style="width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        ">
          <div style="width: 100%;
          height: fit-content;
          padding: 2mm;
          border: 1px solid #ccc;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;" class="bingo-card" key="${idx}">
            <div class="bingo-table">${EstructuraTabla1({
              dataTables: data,
            })}</div>
            <span></span>
          </div>
        </div>
  `
    )
    .join("");

  return `
 
    <div style="font-family: 'Arial', sans-serif;
        width: 210mm;
        min-height: 297mm;
        height: 100%;
        background: white;
        padding: 2mm;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;"
    class="page">
      <div style=" border: solid 1px rgba(0, 0, 0, 0.2);
      background-color: #f1f1f1;
      border-radius: 10px;
      padding: 5mm;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      gap: 2mm;" class="header">
        <h4 style="margin: 0;
        width: 100%;
        padding-bottom: 1mm;
        border-bottom: solid 1px rgba(0, 0, 0, 0.1);
        text-align: center;">EL GRAN BINGO CHABELITA</h4>
        <div style="text-align: center;
        bottom: 0;
        display: flex;
        align-items: center;
        gap: 10mm;
        justify-content: space-evenly;
        width: 100%;" class="header-body">
          <div style="flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;" class="c1-header">
            <img style="width: 100%;" src="${process.env.FRONT_URL}/LogoChabelita1.ico" alt="Logo" />
          </div>

          <div style="flex: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2mm;" class="c2-header">
            ${
              dataInfo[0].premios.length > 0
                ? `
              <div>
                <div class="c2-tit">Premios adicionales:</div>
                <div style="display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                column-gap: 3mm;
                row-gap: 1.5mm;
                border: solid 1px rgba(0, 0, 0, 0.3);
                padding: 1mm 2mm;
                border-radius: 2mm;" class="c2-content">${premiosContent}</div>
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
          <div style="flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;" class="c3-header">
            <h3>1era Tabla Llena: $${dataInfo[0].premio1}</h3>
            <span>2da Tabla Llena: $${dataInfo[0].premio2}</span>
            <span>3ra Tabla Llena: $${dataInfo[0].premio3}</span>
            <span>Se jugará el: <br></br>${formatearFechaConHora(
              dataInfo[0].fecha_hora
            )}</span>
          </div>
        </div>
      </div>
      <div style="display: flex;
      width: 100%;
      padding: 0;
      flex-direction: column;
      justify-content: center;" class="body">
        ${LetrasGrid({ letras: dataInfo[0].letras })}
        <div style="width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5mm;" class="bingo-container-u">
        
        ${juegoContent}
        </div>
      </div>
      <div style="padding: 2mm;
      background-color: #f1f1f1;
      text-align: center;
      border: solid 1px black;
      border-radius: 10px;
      bottom: 0;" class="footer">---------- Vendida por: ${nombreRes} ----------</div>
    </div>
  `;
};
