import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import ManageUsersVend from "../AdminPages/ManageUsersVend";
import EliminarVentas from "../AdminPages/EliminarVentas";

const ContenedorPadre = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  height: calc(100vh);
  width: 100%;
  /* background-image: url("/back1.webp"), rgba(255, 255, 255, 0.1); */
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.2)),
    url("/fondo3.svg");
  background-size: auto;
  background-repeat: repeat;
  background-position: center center;
`;
const AdminRoutes = () => {
  return (
    <ContenedorPadre>
      <Routes>
        <Route path="manageUsers" element={<ManageUsersVend />} />
        <Route path="delVentas" element={<EliminarVentas />} />
      </Routes>
    </ContenedorPadre>
  );
};

export default AdminRoutes;
