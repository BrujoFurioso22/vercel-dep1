import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthContext";
import { BotonWpp } from "../components/styled-componets/ComponentsPrincipales";

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
  margin-top: -50px;
  /* margin-top: calc(var(--altura-mensaje)); */
  color: var(--color-blanco);
  text-shadow: var(--sombra-intensa);
  @media screen and (max-width: 480px){
  font-size: 4rem;
    
  }
  @media screen and (min-width: 481px) and (max-width: 1024px){
  font-size: 7rem;
    
  }
`;
const ContenidoPagina = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

const ContenedorPP = styled.div`
  height: calc(100vh - var(--altura-header));
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ContenedorVerMas = styled.div`
  position: absolute;
  bottom: 20px;
  /* background-color: var(--color-1); */
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  user-select: none;
  .c1 {
    width: fit-content;
    height: fit-content;
    aspect-ratio: 1;
    border-radius: 100%;
    border: none;
    background-color: var(--color-blanco);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    flex-direction: column;
    line-height: 15px;
    box-shadow: var(--sombra-intensa);
    cursor: pointer;
    animation: identifier 1s infinite alternate
      cubic-bezier(0.68, -0.55, 0.27, 1.55);

    & > span {
      padding-top: 10px;
    }
  }

  @keyframes identifier {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-10px);
    }
  }
`;

const ContenedorElemento1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .imgTabla {
    width: 50%;
    height: 70%;
    background: var(--color-5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > .contenedor1 {
    display: flex;
    flex-direction: row;
    height: 500px;
    width: 100%;
    & > div {
      display: flex;
      width: 100%;
      height: auto;
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
  const rol = localStorage.getItem("rol") ?? "99";
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

  const scrollToElement = () => {
    const element = document.getElementById("elemento1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ContenedorPadre>
      <Header />
      {usu !== null && rol === "0" && (
        <ContenedorRevisarTablas>
          <div className="texto">Revisa tus tablas aqui {">"}</div>
          <button onClick={handleClickTablas} className="boton">
            Tablas
          </button>
        </ContenedorRevisarTablas>
      )}
      <ContenidoPagina>
        <ContenedorPP>
          <BingoText style={{ textAlign: "center" }}>
            BINGO
            <br />
            CHABELITA
          </BingoText>
          <ContenedorVerMas>
            <div className="c1" onClick={scrollToElement}>
              <span>Ver más</span>
              <i className="bi bi-arrow-down-short"></i>
            </div>
          </ContenedorVerMas>
        </ContenedorPP>
        <ContenedorElemento1 id="elemento1">
          <h2>Esta semana se juega...</h2>
          <div className="contenedor1">
            <div className="d1">
              <h3>Cartilla 1</h3>
              <div className="imgTabla">...</div>
              <div>
                <BotonWpp
                  phoneNumber={"593939188903"}
                  message={
                    "¡Hola! Estoy interesado en adquirir una tabla de tipo *1*. Me gustaría saber cuál es el precio actual y si tienen disponibilidad. Gracias de antemano por su atención."
                  }
                />
              </div>
            </div>
            <div className="d2">
              <h3>Cartilla 2</h3>
              <div className="imgTabla">...</div>
              <div>
                {" "}
                <BotonWpp
                  phoneNumber={"593939188903"}
                  message={
                    "¡Hola! Estoy interesado en adquirir una tabla de tipo *2*. Me gustaría saber cuál es el precio actual y si tienen disponibilidad. Gracias de antemano por su atención."
                  }
                />
              </div>
            </div>
          </div>
        </ContenedorElemento1>
      </ContenidoPagina>
    </ContenedorPadre>
  );
}

export default LandingPage;
