import styled from "styled-components";
export const ContenedorPadre = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;
export const BotonTipo1 = styled.button`
  border: solid 1px var(--color-1);
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
  background-color: var(--fondo-secundario);
  color: var(--color-1);
`;



const InputField = styled.div`
  position: relative;
  padding: 5px;
  border-radius: 10px;
  border: solid 1px var(--borde-ligero);
  overflow: hidden; // Mantiene el label dentro de los bordes del div

  & > input {
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    height: 20px;
    padding-top: 10px; // Espacio para el label subiendo
    padding-left: 10px;
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
`;

export const InputFieldCustom = ({ onChange, label }) => {
  return (
    <InputField>
      <input
        placeholder=" "
        id="my-input"
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor="my-input">{label}</label>
    </InputField>
  );
};
