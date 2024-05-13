import React from "react";

export const EstructuraTabla1 = ({ dataTables }) => {
  return `
    <div style="width: fit-content;
    padding: 10px;" className="tabla-bingo">
      <div>
        <span>#${dataTables.numtabla}</span>
        <div style="display: flex;
        flex-direction: column;" className="contenedor-grid">
          <span style=" border: solid 1px #000000;
          border-bottom: none;
          padding: 10px;
          display: flex;
          font-weight: 800;
          justify-content: center;
          align-items: center;
          border-radius: 15px 15px 0 0;
          background-color: var(--color-4);
          letter-spacing: 10px;
          text-align: center;
          
          ">BINGO</span>
          ${GridH({ data: dataTables })}
        </div>
      </div>
    </div>`;
};

const GridH = ({ data }) => {
  const datos = data.datos;
  // Creamos un arreglo de 25 elementos, dejando el índice 12 (centro del grid 5x5) vacío
  const gridData = Array.from({ length: 25 }, (_, i) => {
    return i === 12 ? "BINGO" : datos[i + 1]; // Ajustamos el índice para acceder correctamente a los datos
  });
  // Convertimos gridData a elementos HTML como string
  const gridItems = gridData
    .map((item, index) => {
      const isCorner = index === 20 || index === 24 ? "isCorner" : "";
      const position =
        index === 0 ? "bottom-left" : index === 24 ? "bottom-right" : "";

      return `
      <div style="background-color: transparent;
      height: 15mm;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #000000;
      border-bottom: 1px solid #000000;
      font-weight: 800;" class="grid-cell" key="${index}" ${isCorner} position="${position}">
        ${item}
      </div>`;
    })
    .join(""); // Unimos todos los elementos del array en una sola cadena

  return `<div style="display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0;
  width: 75mm;
  border-radius: 0 0 15px 15px;
  overflow: hidden;
  border: solid 1px #000000;
  background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('${process.env.FRONT_URL}/LogoChabelita1.ico');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;" class="grid">${gridItems}</div>`;
};
