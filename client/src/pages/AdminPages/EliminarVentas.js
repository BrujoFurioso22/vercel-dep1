import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  overflow: auto;
  backdrop-filter: blur(7px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  -webkit-backdrop-filter: blur(7px);
`;

const Contenedor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BotonEliminar = styled.button`
  padding: 10px 20px;
  outline: none;
  border: solid 1px white;
  background-color: red;
  color: white;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  box-shadow: var(--sombra-ligera);
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const ContenedorConfirmacion = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: var(--sombra-ligera);
  border-radius: 5px;
  .ContenedorBotones {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    & > button {
      border: none;
      padding: 10px 15px;
      font-weight: 600;
      border-radius: 10px;
      color: white;
font-size: 16px;
    }
    & > .cancelar {
      background-color: gray;
    }
    & > .aceptar{
      background-color: green;
      color: white;
    }
  }
`;

const EliminarVentas = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    // Lógica para eliminar todo
    console.log("Eliminado todo");
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <Contenedor1>
          <BotonEliminar onClick={handleDeleteClick}>
            Eliminar todo
          </BotonEliminar>
          {showConfirmation && (
            <ContenedorConfirmacion>
              <span>¿Seguro que quiere eliminar todo?</span>
              <span>Ten en cuenta que se borrara todas las ventas realizadas</span>
              <div className="ContenedorBotones">
                <button onClick={handleCancel} className="cancelar">
                  Cancelar
                </button>
                <button onClick={handleConfirm} className="aceptar">
                  Aceptar
                </button>
              </div>
            </ContenedorConfirmacion>
          )}
        </Contenedor1>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default EliminarVentas;
