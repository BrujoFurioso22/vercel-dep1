import React from "react";

export const EstructuraTabla2 = ({ dataTables }) => {
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
          
          ">LA ÚNICA</span>
          ${GridH({ data: dataTables })}
        </div>
        <span style="font-size:8px;">Vend:${dataTables.alias}</span>
      </div>
    </div>`;
};

const GridH = ({ data }) => {
  const datos = data.datos;
  // Creamos un arreglo de 9 elementos, dejando el índice 1,4 (centro del grid 3x3) vacío
  const gridData = Array.from({ length: 9 }, (_, i) => {
    return i === 1 || i === 4 ? "" : datos[i + 1]; // Ajustamos el índice para acceder correctamente a los datos
  });
  // Convertimos gridData a elementos HTML como string
  const gridItems = gridData
    .map((item, index) => {
      const isCorner = index === 6 || index === 8 ? "isCorner" : "";
      const position =
        index === 6 ? "bottom-left" : index === 8 ? "bottom-right" : "";

      if (index === 1 || index === 4) {
        return `<div></div>`;
      } else {
        return `
        <div style="display:flex;justify-content:center;align-items:center;padding:2mm">
        <div style="background-color: #ededed;
          aspect-ratio:1;
          padding:5px;
          width:10mm;
          border-radius:100%;
          border:solid 1px black;
          display:flex;
          justify-content:center;
          align-items:center;
          font-weight: 800;" 
          class="grid-cell-r" key="${index}" ${isCorner} position="${position}">
          ${item}
        </div></div>`;
      }
    })
    .join(""); // Unimos todos los elementos del array en una sola cadena

  return `<div style="display: grid;
      grid-template-columns: repeat(3, 1fr);
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
