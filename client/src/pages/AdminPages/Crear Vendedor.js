import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  overflow: auto;
  backdrop-filter: blur(7px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  -webkit-backdrop-filter: blur(7px);
`;

const Contenedor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const InputWrapper1 = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const OjoIcono = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ErrorLabel = styled.label`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  max-width: 350px;
`;

const Button = styled.button`
  padding: 10px 20px;
  outline: none;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const ContenedorConfirmacion = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  box-shadow: var(--sombra-ligera);
  border-radius: 5px;
  & > h3 {
    margin: 0;
  }
`;

const ContenedorBotones = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const BotonAccion = styled.button`
  border: none;
  padding: 10px 15px;
  font-weight: 600;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const BotonCancelar = styled(BotonAccion)`
  background-color: gray;
`;

const BotonConfirmar = styled(BotonAccion)`
  background-color: green;
`;

const CrearVendedor = () => {
  const [formData, setFormData] = useState({
    cc: "",
    nombre: "",
    alias: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.cc.length < 10) {
      newErrors.cc = "La cédula/teléfono debe tener al menos 10 caracteres.";
    }
    if (formData.nombre.length < 10) {
      newErrors.nombre = "El nombre debe tener al menos 10 caracteres.";
    }
    if (formData.alias.length < 5) {
      newErrors.alias = "El alias debe tener al menos 5 caracteres.";
    }
    if (formData.password.length < 7) {
      newErrors.password = "La contraseña debe tener al menos 7 caracteres.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "La contraseña y la confirmación de la contraseña no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    console.log("Formulario confirmado:", formData);
    setShowConfirmation(false);
    // Aquí puedes agregar la lógica para enviar el formulario
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <Contenedor1>
          <Formulario onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                type="text"
                name="cc"
                placeholder="Cédula/Teléfono"
                value={formData.cc}
                onChange={handleChange}
              />
              {errors.cc && <ErrorLabel>{errors.cc}</ErrorLabel>}
            </InputWrapper>
            <InputWrapper>
              <Input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              {errors.nombre && <ErrorLabel>{errors.nombre}</ErrorLabel>}
            </InputWrapper>
            <InputWrapper>
              <Input
                type="text"
                name="alias"
                placeholder="Alias"
                value={formData.alias}
                onChange={handleChange}
              />
              {errors.alias && <ErrorLabel>{errors.alias}</ErrorLabel>}
            </InputWrapper>
            <InputWrapper>
              <InputWrapper1>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
                <OjoIcono onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <i className="bi bi-eye-fill"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill"></i>
                  )}
                </OjoIcono>
              </InputWrapper1>
              {errors.password && <ErrorLabel>{errors.password}</ErrorLabel>}
            </InputWrapper>
            <InputWrapper>
              <InputWrapper1>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <OjoIcono
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="bi bi-eye-fill"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill"></i>
                  )}
                </OjoIcono>
              </InputWrapper1>
              {errors.confirmPassword && (
                <ErrorLabel>{errors.confirmPassword}</ErrorLabel>
              )}
            </InputWrapper>
            <Button type="submit">Crear Vendedor</Button>
          </Formulario>
        </Contenedor1>
        {showConfirmation && (
          <ContenedorConfirmacion>
            <h3>Confirmar Datos</h3>
            <span>
              <b>Cédula/Teléfono:</b> {formData.cc}
            </span>
            <span>
              <b>Nombre:</b> {formData.nombre}
            </span>
            <span>
              <b>Alias:</b> {formData.alias}
            </span>
            <span>
              <b>Contraseña:</b> {formData.password}
            </span>
            <span>
              <b>Confirmar Contraseña:</b> {formData.confirmPassword}
            </span>
            <ContenedorBotones>
              <BotonCancelar onClick={handleCancel}>Cancelar</BotonCancelar>
              <BotonConfirmar onClick={handleConfirm}>Confirmar</BotonConfirmar>
            </ContenedorBotones>
          </ContenedorConfirmacion>
        )}
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default CrearVendedor;
