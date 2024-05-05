import React, { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";
import { BotonTipo1 } from "./styled-componets/ComponentsPrincipales";
import { device } from "./styled-componets/MediaQ";
import logo from "../imgs/LogoChabelita1.ico";

const ContenedorHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  height: var(--altura-header);
  /* border-bottom: solid 1px var(--borde-ligero); */
  background: #fcfcf7;
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  z-index: 100;
  &.home {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ContenedorHeader1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
  & > div {
    width: 100%;
  }
`;

const ContenedorLogo = styled.div`
  display: flex;
  & > img {
    width: 50px;
    cursor: pointer;
  }
  & span {
    cursor: pointer;
  }
`;
const ContenedorMenu = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  & a {
    cursor: pointer;
    text-decoration: none;
    color: var(--color-negro);
    padding: 4px 15px;
    border-radius: 10px;
    transition: all 0.3s ease;
    text-align: center;
    line-height: 15px;
    @media ${device.mobile} {
      font-size: 15px;
    }

    &.active-link {
      background-color: var(--color-1); /* Color verde */
      color: white; /* Color de texto blanco */
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    top: var(--altura-header);
    right: -250px; /* Comienza oculto */
    height: 100%;
    width: 250px;
    background-color: #fcfcf7;
    transition: right 0.3s ease;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    z-index: 200;
    &.abierto {
      right: 0; /* Muestra el menú al abrirlo */
    }
    .boton-menu-hamburguesa {
      display: block;
      font-size: 30px;
      border: none;
      background: none;
      cursor: pointer;
    }

    .ContenedorHeader1 {
      justify-content: space-between;
      align-items: center;
    }

    .ContenedorLogin,
    .ContenedorMenu {
      display: none; /* Oculta la parte de login en el móvil */
    }
  }
`;

const ContenedorLogin = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & .botonRedireccion {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--color-1);
    cursor: pointer;
    color: var(--color-blanco);
    text-decoration: none;
  }
`;

const ContenedorDerecho = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 15px;
  height: 100%;
  width: 40%;
  color: var(--color-blanco);
  & > .cuenta {
    position: relative;
    height: var(--altura-header);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    & > i {
      font-size: 28px;
    }
    &:hover > .cuentaDrop {
      display: flex;
    }
    & > .cuentaDrop {
      position: absolute;
      top: 100%;
      right: 0;
      display: none;
      & > div {
        background-color: var(--color-4);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        padding: 15px;
        box-shadow: var(--sombra-intensa);
        color: black;
        gap: 10px;
        border-radius: 10px;
        & > .botonSalir {
          border: solid 2px var(--color-1);
          background-color: var(--color-4);
          color: var(--color-1);
          padding: 5px 10px;
          width: 100%;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }

  @media ${device.mobile} {
    & > span {
      display: none;
    }
  }
`;

function CustomNavLink({ to, children }) {
  // Resuelve la ruta de manera que se considere la ubicación base si la hubiera
  let resolved = useResolvedPath(to);
  // Usa el hook useMatch para verificar si la ruta actual coincide con el enlace
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink to={to} className={match && "active-link"}>
      {children}
    </NavLink>
  );
}

const Header = ({ oculta }) => {
  const { logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const classNameBg = location.pathname === "/" && "home";
  // console.log(rol);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const Menu = () => {
    return (
      <div>
        <CustomNavLink to="/seller/vender">Vender</CustomNavLink>
        <CustomNavLink to="/seller/tablasVendidas">
          Tablas Vendidas
        </CustomNavLink>
        <CustomNavLink to="/seller/tablasenvivo">
          Consultar Tablas
        </CustomNavLink>
        <CustomNavLink to="/seller/editarInfo">Editar PDFs</CustomNavLink>
        <CustomNavLink to="/seller/preview">PR</CustomNavLink>
      </div>
    );
  };
  return (
    <ContenedorHeader className={classNameBg}>
      <ContenedorHeader1>
        <ContenedorLogo>
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo Bingo Chabelita"
          />
          {/* <span onClick={() => navigate("/")}>HOME</span>{" "} */}
        </ContenedorLogo>
        <ContenedorMenu className={`ContenedorMenu ${menuAbierto ? "abierto" : ""}`}>
          {localStorage.getItem("rol") === "23" && <Menu />}
        </ContenedorMenu>
        <button className="boton-menu-hamburguesa" onClick={toggleMenu}>
          &#9776;
        </button>

        <ContenedorLogin className="ContenedorLogin" >
          {!oculta &&
            (localStorage.getItem("id") ? (
              <ContenedorDerecho>
                <div className="cuenta">
                  <i className="bi bi-person-circle" />
                  <div className="cuentaDrop">
                    <div>
                      <span>{localStorage.getItem("nombre")}</span>
                      <button className="botonSalir" onClick={logout}>
                        Salir
                      </button>
                    </div>
                  </div>
                </div>
              </ContenedorDerecho>
            ) : (
              <Link className="botonRedireccion" to="/login">
                Iniciar Sesión
              </Link>
            ))}
        </ContenedorLogin>
      </ContenedorHeader1>
    </ContenedorHeader>
  );
};

export default Header;
