import { useState } from "react";
import styled from "styled-components";
export const ContenedorPadre = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 1;
  background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1)),
    url("/fondo3.svg");
  background-size: auto;
  background-repeat: repeat;
  background-position: center center;
`;

export const BotonTipo1 = styled.button`
  border: solid 1px var(--color-blanco);
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--color-blanco);
`;

const InputField = styled.div`
  position: relative;
  padding: 5px;
  padding-top: 10px;
  max-width: 300px;
  width: 300px;
  border-radius: 10px;
  border: solid 1px var(--color-5);
  overflow: hidden; // Mantiene el label dentro de los bordes del div
  display: flex;
  flex-direction: row;

  & > input {
    width: calc(100% - 40px);
    font-size: 16px;
    border: none;
    outline: none;
    height: auto;
    padding: 3px; // Espacio para el label subiendo
    margin-top: 5px;
    padding-left: 10px;
    border-radius: 5px;
    background: none; // Asegura que el label sea visible cuando suba
    position: relative;
    z-index: 2; // Asegura que el input esté sobre el label
  }

  & > label {
    position: absolute;
    bottom: 50%; // Comienza desde el fondo del div
    transform: translateY(50%);
    left: 10px;

    font-size: 16px;
    color: var(--texto-secundario);
    transition: all 0.3s ease;
    z-index: 1; // Asegura que el label esté detrás del input
  }

  & > input:focus + label,
  & > input:not(:placeholder-shown) + label {
    transform: translateY(-25%); // Mueve el label hacia arriba
    font-size: 12px; // Reduce el tamaño del label
  }
  & .boton-ver {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    z-index: 3;
    user-select: none;
  }
`;

export const InputFieldCustom = ({ onChange, label, type }) => {
  const [inputType, setInputType] = useState(
    type === "password" ? "password" : "text"
  );
  const toggleType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };
  return (
    <InputField>
      <input
        placeholder=" "
        id="my-input"
        type={inputType}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor="my-input">{label}</label>
      {type === "password" && (
        <div className="boton-ver" onClick={toggleType}>
          {/* Aquí puedes usar un ícono como <EyeIcon /> si tienes uno, o un emoji como alternativa simple */}
          {inputType === "password" ? (
            <i className="bi bi-eye-fill"></i>
          ) : (
            <i className="bi bi-eye-slash-fill"></i>
          )}
        </div>
      )}
    </InputField>
  );
};

const Botonwpp = styled.a`
  padding: 5px 20px;
  background-color: var(--color-wpp);
  color: var(--color-blanco);
  text-decoration: none;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 5px;

  cursor: pointer;
`;

export const BotonWpp = ({ phoneNumber, message }) => {
  const encodedMessage = encodeURIComponent(message);
  return (
    <Botonwpp
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="bi bi-whatsapp"></i>
      Contáctanos Ahora!
    </Botonwpp>
  );
};
