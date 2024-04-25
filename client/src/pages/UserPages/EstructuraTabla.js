import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Crea 5 columnas */
  grid-gap: 10px; /* Espacio entre celdas */
  width: 500px; /* Ancho del grid */
  margin: auto; /* Centra el grid horizontalmente */
`;

const GridCell = styled.div`
  background-color: #f0f0f0; /* Color de fondo de cada celda */
  border: 1px solid #ccc; /* Borde de las celdas */
  height: 100px; /* Altura de las celdas */
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
`;

export const EstructuraTabla = ({ data }) => {
  // Convertimos el objeto de datos en un array para manejarlo más fácilmente en el grid
  const gridData = Object.values(data.datos);
  // Insertamos "hola" en la posición central (índice 12 en un arreglo basado en 0)
  gridData.splice(12, 0, "hola");

  return (
    <Grid>
      {gridData.map((item, index) => (
        <GridCell key={index}>{item}</GridCell>
      ))}
    </Grid>
  );
};
