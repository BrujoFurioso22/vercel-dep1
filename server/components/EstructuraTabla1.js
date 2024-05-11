import React from "react";

export const EstructuraTabla1 = ({ dataTables }) => {
  return `
    <div className="tabla-bingo">
      <div>
        <span>#${dataTables.numtabla}</span>
        <div className="contenedor-grid">
          <span>BINGO</span>
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
      <div class="grid-cell" key="${index}" ${isCorner} position="${position}">
        ${item}
      </div>`;
    })
    .join(""); // Unimos todos los elementos del array en una sola cadena

  return `<div class="grid">${gridItems}</div>`;
};
