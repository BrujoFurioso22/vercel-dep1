import React from "react";
import styled from "styled-components";

const ContenedorHeader = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: var(--altura-header);
  padding: 15px;
  border-bottom: solid 1px var(--borde-ligero);
  background-color: var(--fondo-secundario);
`;

const Header = () => {
  return <ContenedorHeader>Header</ContenedorHeader>;
};

export default Header;
