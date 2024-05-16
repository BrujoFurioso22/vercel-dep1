import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import {
  ActualizarBloqueoUsuario,
  ConsultarUserVendedores,
} from "../../consultasBE/Admin";

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
          <button onClick={handleDeleteClick}>Eliminar todo</button>
          {showConfirmation && (
            <div>
              <p>¿Seguro que quiere eliminar todo?</p>
              <button onClick={handleConfirm}>Aceptar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          )}
        </Contenedor1>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default EliminarVentas;
