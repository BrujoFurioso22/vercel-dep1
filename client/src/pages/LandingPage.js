import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthContext";

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
    url("/back1.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const ContenedorRevisarTablas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(var(--altura-header) + 5px);
  width: 100%;
  height: 5vh;
  column-gap: 5vw;
  padding: 20px 0;
  background-color: var(--color-3);
  .texto {
    font-size: 1.3rem;
  }
  .boton {
    font-size: 1.1rem;
    border: none;
    outline: none;
    box-shadow: var(--sombra-intensa);
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: var(--color-1);
      color: var(--color-blanco);
    }
  }
`;

const BingoText = styled.h1`
  font-family: "Chewy", system-ui;
  font-weight: 500;
  font-style: normal;
  font-size: 9rem;
  padding-top:var(--altura-mensaje);
  color: var(--color-blanco);
  text-shadow: var(--sombra-intensa);
`;
const ContenidoPagina = styled.div`
  height: 100vh;
`;
function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [usu, setUsu] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      setUsu(localStorage.getItem("id"));
    } else {
      setUsu(null);
    }
  }, [isAuthenticated]);

  return (
    <ContenedorPadre>
      <Header />
      {usu !== null && (
        <ContenedorRevisarTablas>
          <div className="texto">Revisa tus tablas aqui {">"}</div>
          <button className="boton">Tablas</button>
        </ContenedorRevisarTablas>
      )}
      <ContenidoPagina>
        <BingoText style={{ textAlign: "center" }}>
          BINGO <br /> CHABELITA
        </BingoText>
      </ContenidoPagina>
    </ContenedorPadre>
  );
}

export default LandingPage;
