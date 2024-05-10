import React from "react";
import { Route, Routes } from "react-router-dom";
import Tablas from "../UserPages/Tablas";
import styled from "styled-components";

const ContenedorPadre = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  /* background-image: url("/back1.webp"), rgba(255, 255, 255, 0.1); */
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.2)),
    url("/fondo3.svg");
  
    background-size: auto;
  background-repeat: repeat;
  background-position: center center;
`;
const UserRoutes = () => {
  return (
    <ContenedorPadre>
      <Routes>
        <Route path="tablas" element={<Tablas />} />
      </Routes>
    </ContenedorPadre>
  );
};

export default UserRoutes;
