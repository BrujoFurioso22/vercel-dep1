import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";
import { BotonTipo1 } from "./styled-componets/ComponentsPrincipales";

const ContenedorHeader = styled.div`
  display: flex;
  position: relative;
  top: 0;
  width: 100%;
  height: var(--altura-header);
  border-bottom: solid 1px var(--borde-ligero);
  background-color: var(--fondo-secundario);
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
`

const Header = () => {
  const { logout } = useAuth();
  return (
    <ContenedorHeader>
      <ContenedorHeader1>
        <ContenedorLogo>LOGO</ContenedorLogo>
        <ContenedorLogin>
          {localStorage.getItem("id") ? (
            <ContenedorDerecho>
              Bienvenido {localStorage.getItem("id")}
              <BotonTipo1 onClick={logout}>Salir</BotonTipo1>
            </ContenedorDerecho>
          ) : (
            <Link className="botonRedireccion" to="/login">
              Iniciar Sesión
            </Link>
          )}
        </ContenedorLogin>
      </ContenedorHeader1>
    </ContenedorHeader>
  );
};

export default Header;
