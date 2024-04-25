import React from "react";
import styled from "styled-components";

const ContenedorGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  & > span {
    border: solid 1px var(--color-negro);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0;
  width: 500px;
  border-radius: 15px;
  overflow: hidden;
  border: solid 1px var(--color-negro);
  background-color: var(--color-4);
`;

const GridCell = styled.div`
  background-color: transparent;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--color-negro);
  border-bottom: 1px solid var(--color-negro);
  &:nth-child(5n) {
    border-right: none; /* No borders on the right for the 5th, 10th, 15th, 20th, and 25th cells (right-most cells) */
  }
  &:nth-child(-n + 5) {
    border-top: none; /* Top border only for the first row */
  }
  &:nth-child(5n + 1) {
    border-left: none; /* Left border for the cells in the first column */
  }
  &:nth-last-child(-n + 5) {
    border-bottom: none; /* No bottom borders for the last row */
  }
  border-radius: ${({ isCorner, position }) => {
    if (!isCorner) return "0";
    switch (position) {
      case "top-left":
        return "15px 0 0 0"; /* Ajustado para coincidir con el borde del Grid */
      case "top-right":
        return "0 15px 0 0";
      case "bottom-left":
        return "0 0 0 15px";
      case "bottom-right":
        return "0 0 15px 0";
      default:
        return "0";
    }
  }};
`;

export const EstructuraTabla = ({ dataTables }) => {
  console.log(dataTables);
  return (
    <div>
      {dataTables.map((data, idx) => (
        <ContenedorGrid ContenedorGrid key={idx}>
          <span>Tabla {data.numtabla}</span>
          <GridH data={data} />
        </ContenedorGrid>
      ))}
    </div>
  );
};

const GridH = ({ data }) => {
  const datos = data.datos;
  // Creamos un arreglo de 25 elementos, dejando el índice 12 (centro del grid 5x5) vacío
  const gridData = Array.from({ length: 25 }, (_, i) => {
    return i === 12 ? "BINGO" : datos[i + 1]; // Ajustamos el índice para acceder correctamente a los datos
  });

  return (
    <Grid>
      {gridData.map((item, index) => (
        <GridCell
          key={index}
          isCorner={index === 0 || index === 4 || index === 20 || index === 24}
          position={
            index === 0
              ? "top-left"
              : index === 4
              ? "top-right"
              : index === 20
              ? "bottom-left"
              : index === 24
              ? "bottom-right"
              : null
          }
        >
          {item}
        </GridCell>
      ))}
    </Grid>
  );
};
