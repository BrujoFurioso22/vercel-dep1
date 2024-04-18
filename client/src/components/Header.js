import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";
import { BotonTipo1 } from "./styled-componets/ComponentsPrincipales";

const ContenedorHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  height: var(--altura-header);
  /* border-bottom: solid 1px var(--borde-ligero); */
  background: rgba(255, 255, 255, 0.1);
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  z-index: 100;
`;

const ContenedorHeader1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
`;

const ContenedorLogo = styled.div`
  display: flex;
  & span {
    cursor: pointer;
  }
`;

const ContenedorLogin = styled.div`
  display: flex;
  justify-content: center;
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
  gap: 15px;
  color: var(--color-blanco);
`;

const Header = ({ oculta }) => {
  const { logout, rol } = useAuth();

  const navigate = useNavigate();
  return (
    <ContenedorHeader>
      <ContenedorHeader1>
        <ContenedorLogo>
          <span onClick={() => navigate("/")}>HOME</span>{" "}
        </ContenedorLogo>
        <ContenedorLogo>
          {rol === 23 && (
            <div>
              <Link to="/seller/vender">Vender</Link>
              <Link to="/seller/consultarT">Consultar</Link>
            </div>
          )}
        </ContenedorLogo>
        <ContenedorLogin>
          {!oculta &&
            (localStorage.getItem("id") ? (
              <ContenedorDerecho>
                Bienvenido {localStorage.getItem("id")}
                <BotonTipo1 onClick={logout}>Salir</BotonTipo1>
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
