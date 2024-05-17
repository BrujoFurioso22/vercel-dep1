import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import VenderTablas from "../SellerPages/VenderTablas";
import TablasVendidas from "../SellerPages/TablasVendidas";
import ConsultarTablasEnVivo from "../SellerPages/ConsultarTablasEnVivo";
import Preview from "../../components/pdfMaker/Preview";
import EditInfoTemplates from "../SellerPages/EditInfoTemplates";
import ConsultarDatosCliente from "../SellerPages/ConsultarClientes";
import Jugadas from "../SellerPages/Jugadas";
import HistorialJugadas from "../SellerPages/HistorialJugadas";

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
const SellerRoutes = () => {
  return (
    <ContenedorPadre>
      <Routes>
        <Route path="vender" element={<VenderTablas />} />
        <Route path="tablasVendidas" element={<TablasVendidas />} />
        <Route path="jugadas" element={<Jugadas />} />
        <Route path="tablasenvivo" element={<ConsultarTablasEnVivo />} />
        <Route path="historialJugadas" element={<HistorialJugadas />} />
        <Route path="infoClientes" element={<ConsultarDatosCliente />} />
        {/* <Route path="preview" element={<Preview />} /> */}
        <Route path="editarInfo" element={<EditInfoTemplates />} />
      </Routes>
    </ContenedorPadre>
  );
};

export default SellerRoutes;
