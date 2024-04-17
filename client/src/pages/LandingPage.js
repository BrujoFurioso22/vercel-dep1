import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
    url("/bingobg1.webp");
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
  height: var(--altura-mensaje);
  column-gap: 5vw;
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
  position: relative;
  font-size: 9rem;
  margin: 0;
  margin-top: calc(var(--altura-mensaje));
  height: calc(100vh - var(--altura-header) - var(--altura-mensaje));
  color: var(--color-blanco);
  text-shadow: var(--sombra-intensa);
`;
const ContenidoPagina = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

const ContenedorElemento1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .imgTabla {
    width: 50%;
    height: 40%;
    background: var(--color-5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > .contenedor1 {
    display: flex;
    flex-direction: row;
    height: 600px;
    width: 100%;
    & > div {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .d1 {
      background-color: var(--color-2);
    }
    .d2 {
      background-color: var(--color-1);
    }
  }
`;
function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [usu, setUsu] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      setUsu(localStorage.getItem("id"));
    } else {
      setUsu(null);
    }
  }, [isAuthenticated]);

  const handleClickTablas = () => {
    navigate("/user/tablas");
  };

  return (
    <ContenedorPadre>
      <Header />
      {usu !== null && (
        <ContenedorRevisarTablas>
          <div className="texto">Revisa tus tablas aqui {">"}</div>
          <button onClick={handleClickTablas} className="boton">
            Tablas
          </button>
        </ContenedorRevisarTablas>
      )}
      <ContenidoPagina>
        <BingoText style={{ textAlign: "center" }}>
          BINGO
          <br />
          CHABELITA
        </BingoText>
        <ContenedorElemento1>
          <h2>Esta semana se juega...</h2>
          <div className="contenedor1">
            <div className="d1">
              <h3>El tal 1</h3>
              <div className="imgTabla">
                ...
              </div>
            </div>
            <div className="d2">
              <h3>El tal 2</h3>
              <div className="imgTabla">
                ...
              </div>
            </div>
          </div>
        </ContenedorElemento1>
      </ContenidoPagina>
    </ContenedorPadre>
  );
}

export default LandingPage;
