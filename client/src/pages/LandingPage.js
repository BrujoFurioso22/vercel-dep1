import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthContext";
import { BotonWpp } from "../components/styled-componets/ComponentsPrincipales";
import { device } from "../components/styled-componets/MediaQ";
import { ObtenerDesNormal, ObtenerDesRapida } from "../consultasBE/Tablas";
import juego1 from "../imgs/juegonormal.jpg";
import juego2 from "../imgs/juegorapido.jpg";

const ContenedorPadre = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  /* height: calc(100dvh); */
  width: 100%;
  /* background-image: url("/back1.webp"), rgba(255, 255, 255, 0.1); */
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
  z-index: 20;
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
  margin: 0;
  /* margin-top: -50px; */
  line-height: 90%;
  -webkit-text-stroke: 2px black;
  /* margin-top: calc(var(--altura-mensaje)); */
  color: var(--color-blanco);
  text-shadow: var(--sombra-intensa);
  @media screen and (max-width: 480px) {
    font-size: 6rem;
  }
  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 7rem;
  }
`;
const ContenidoPagina = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const ContenedorPP = styled.div`
  /* height: calc(100dvh - var(--altura-header)); */
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.2)),
    url("/BGBINGO.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: calc(100dvh - var(--altura-header));
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
  height: auto;
  .imgTabla {
    width: 70%;
    height: fit-content;
    background: var(--color-5);
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      object-fit: contain;
      aspect-ratio: 1;
      width: 100%;
    }
  }

  & > .contenedor1 {
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: 100%;
    @media ${device.mobile} {
      flex-direction: column;
      /* height: 80dvh;/ */
    }
    & > div {
      display: flex;
      width: 100%;
      height: auto;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px;
      @media ${device.mobile} {
        height: auto;
      }
    }

    .d1,
    .d2 {
      & > h2 {
        margin: 0;
      }
      display: flex;
      gap: 10px;
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
  const [cont1, setCont1] = useState([]);
  const [cont2, setCont2] = useState([]);
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
  const limpiarArreglo = (arreglo) => {
    return arreglo.filter((item) => item.trim() !== "");
  };
  const obtenerDatosAdicionales = async (funcionObtener) => {
    const res = await funcionObtener();
    if (res) {
      // Verifica si existe el campo 'premios' y lo procesa adecuadamente
      let info = { ...res.data.data };
      if (info.premios) {
        info.premios = limpiarArreglo(info.premios);
      }
      return [info];
    }
    return [];
  };

  const ObtenerContenidoJuegos = async () => {
    const data1 = await obtenerDatosAdicionales(ObtenerDesNormal);
    const data2 = await obtenerDatosAdicionales(ObtenerDesRapida);
    setCont1(data1[0]);
    setCont2(data2[0]);
    // console.log(data1[0]);
  };

  useEffect(() => {
    ObtenerContenidoJuegos();
  }, []);

  function formatearFechaConHora(fechaISO) {
    const opciones = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const fecha = new Date(fechaISO);
    const fechaFormateada = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );
    return fechaFormateada.replace(" a. m.", " AM").replace(" p. m.", " PM");
  }
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
          <h2>Ven, disfruta y gana...</h2>
          <div className="contenedor1">
            <div className="d1">
              <h2>Tablón</h2>
              <span>{cont1.contenido}</span>
              <div className="imgTabla">
                <img src={juego1} alt="juego1" />
              </div>
              <h4>
                Fecha de próximo juego {"->"}{" "}
                {Object.keys(cont1).length > 0 &&
                  formatearFechaConHora(cont1.fecha_hora)}
              </h4>

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
              <h2>Única</h2>
              <span>{cont2.contenido}</span>

              <div className="imgTabla">
                <img src={juego2} alt="juego1" />
              </div>
              <h4>
                Fecha de próximo juego {"->"}{" "}
                {Object.keys(cont2).length > 0 &&
                  formatearFechaConHora(cont2.fecha_hora)}
              </h4>
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
