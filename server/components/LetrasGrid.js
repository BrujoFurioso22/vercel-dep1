import React from "react";

const gridMap = {
  A: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 25],
  B: [1, 2, 3, 4, 6, 10, 11, 12, 13, 14, 16, 20, 21, 22, 23, 24],
  C: [1, 2, 3, 4, 5, 6, 11, 16, 21, 22, 23, 24, 25],
  D: [1, 2, 3, 4, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24],
  E: [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25],
  F: [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 21],
  G: [1, 2, 3, 4, 5, 6, 11, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25],
  H: [1, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 25],
  I: [1, 2, 3, 4, 5, 8, 13, 18, 21, 22, 23, 24, 25],
  J: [1, 2, 3, 4, 5, 8, 13, 18, 21, 22, 23],
  K: [1, 5, 6, 9, 11, 12, 13, 16, 19, 21, 25],
  L: [1, 6, 11, 16, 21, 22, 23, 24, 25],
  M: [1, 5, 6, 7, 9, 10, 11, 13, 15, 16, 20, 21, 25],
  N: [1, 5, 6, 7, 10, 11, 13, 15, 16, 19, 20, 21, 25],
  O: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25],
  P: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 21],
  Q: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 19, 20, 21, 22, 23, 24, 25],
  R: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 19, 21, 25],
  S: [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25],
  T: [1, 2, 3, 4, 5, 8, 13, 18, 23],
  U: [1, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25],
  V: [1, 5, 6, 10, 12, 14, 17, 19, 23],
  W: [1, 5, 6, 8, 10, 11, 13, 15, 16, 17, 19, 20, 21, 25],
  X: [1, 5, 7, 9, 13, 17, 19, 21, 25],
  Y: [1, 5, 7, 9, 13, 18, 23],
  Z: [1, 2, 3, 4, 5, 9, 13, 17, 21, 22, 23, 24, 25],
};

function LetrasGrid({ letras }) {
  // console.log(letras);
  const contenedorGridLetras = letras
    .map((letra) => SingleGrid({letra}))
    .join("");
  return `<div style="display: flex;  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;" className="ContenedorGridLetras">${contenedorGridLetras}</div>`;
}
const SingleGrid = ({ letra }) => {
  const grid = Array.from({ length: 25 }, (_, index) => {
    let adjustedIndex = index + 1;
    let isColored = gridMap[letra]?.includes(adjustedIndex);
    return {
      index: adjustedIndex,
      isColored: isColored,
    };
  });

  const gridItems = grid
    .map((cell) => {
      return `
        <div style="
          width: 3mm;
          height: 3mm;
          background-color: ${cell.isColored ? 'orange' : 'white'};
          border: 0.1mm solid rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
        </div>
      `;
    })
    .join("");
  return `
    <div style="
      display: grid;
      grid-template-columns: repeat(5, 3mm);
      gap: 1px;
      margin-bottom: 1mm;
    ">
      ${gridItems}
    </div>
  `;
};

export default LetrasGrid;
