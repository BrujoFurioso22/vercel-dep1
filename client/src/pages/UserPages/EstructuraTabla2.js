import React from "react";
import styled from "styled-components";

import logo from "../../imgs/FondoTabla2.png";
const logo1 = `${process.env.REACT_APP_URL_CLIENT}/LogoChabelita1.ico`


const TablaBingo = styled.div`
  width: fit-content;
  padding: 10px;
`;
const ContenedorGrid = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  /* padding: 20px; */
  & > .title {
    border: solid 1px #000000;
    border-bottom: none;
    padding: 10px;
    display: flex;
    font-weight: 800;
    justify-content: center;
    align-items: center;
    border-radius: 15px 15px 0 0;
    background-color: rgba(255, 255, 255, 0.85);
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
  border: solid 1px #000000;
  background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('${logo1}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const GridCell = styled.div`
  background-color: transparent;
  height: 14mm;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-right: 1px solid var(--color-negro); */
  /* border-bottom: 1px solid var(--color-negro); */
  font-weight: 800;

  &:nth-child(3n) {
    border-right: none;
  }
  &:nth-child(-n + 3) {
    border-top: none;
  }
  &:nth-child(3n + 1) {
    border-left: none;
  }
  &:nth-last-child(-n + 3) {
    border-bottom: none;
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
          <span className="title">LA ÚNICA</span>
          <GridH data={dataTables} />
          <span style={{fontSize:"10px"}}>Vend:{dataTables.alias}</span>
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
          <div
            style={
              index === 1 || index === 4
                ? {}
                : {
                    backgroundColor: "var(--color-4)",
                    aspectRatio: "1",
                    fontSize:"8mm",
                    // padding: "5px",
                    width: "12mm",
                    borderRadius: "100%",
                    border: "solid 1px black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
            }
          >
            {item}
          </div>
        </GridCell>
      ))}
    </Grid>
  );
};
