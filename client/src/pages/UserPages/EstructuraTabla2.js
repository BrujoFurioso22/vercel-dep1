import React from "react";
import styled from "styled-components";
const TablaBingo = styled.div`
  width: fit-content;
  padding: 10px;
`;
const ContenedorGrid = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  /* padding: 20px; */
  & > span {
    border: solid 1px var(--color-negro);
    border-bottom: none;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px 15px 0 0;
    background-color: var(--color-4);
    letter-spacing: 10px;
    text-align: center;
    &::after {
      content: "";
      margin-left: -10px; /* Ajusta esto al valor de tu letter-spacing */
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0;
  width: 75mm;
  border-radius: 0 0 15px 15px;
  overflow: hidden;
  border: solid 1px var(--color-negro);
  background-color: var(--color-4);
`;

const GridCell = styled.div`
  background-color: transparent;
  height: 14mm;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--color-negro);
  border-bottom: 1px solid var(--color-negro);
  &:nth-child(3n) {
    border-right: none; /* No borders on the right for the 5th, 10th, 15th, 20th, and 25th cells (right-most cells) */
  }
  &:nth-child(-n + 3) {
    border-top: none; /* Top border only for the first row */
  }
  &:nth-child(3n + 1) {
    border-left: none; /* Left border for the cells in the first column */
  }
  &:nth-last-child(-n + 3) {
    border-bottom: none; /* No bottom borders for the last row */
  }
  border-radius: ${({ isCorner, position }) => {
    if (!isCorner) return "0";
    switch (position) {
      case "bottom-left":
        return "0 0 0 15px";
      case "bottom-right":
        return "0 0 15px 0";
      default:
        return "0";
    }
  }};
`;

export const EstructuraTabla2 = ({ dataTables }) => {
  return (
    <TablaBingo>
      <div>
        <span>#{dataTables.numtabla}</span>
        <ContenedorGrid>
          <span>RAPIDIN</span>
          <GridH data={dataTables} />
        </ContenedorGrid>
      </div>
    </TablaBingo>
  );
};

const GridH = ({ data }) => {
  const datos = data.datos;
  // Creamos un arreglo de 25 elementos, dejando el índice 12 (centro del grid 5x5) vacío
  const gridData = Array.from({ length: 9 }, (_, i) => {
    return i === 1 || i === 4 ? "" : datos[i + 1]; // Ajustamos el índice para acceder correctamente a los datos
  });

  return (
    <Grid>
      {gridData.map((item, index) => (
        <GridCell
          key={index}
          isCorner={index === 6 || index === 8}
          position={
            index === 6 ? "bottom-left" : index === 8 ? "bottom-right" : null
          }
        >
          {item}
        </GridCell>
      ))}
    </Grid>
  );
};
