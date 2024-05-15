import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerificarUsuario } from "../consultasBE/User";
import { ContenedorPadre } from "../components/styled-componets/ComponentsPrincipales";
import { InputFieldCustom } from "../components/styled-componets/ComponentsPrincipales";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";
import Header from "../components/Header";

const ContenedorLogin = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  /* padding-top: 5%; */
  height: 100%;

  /* padding-top: 5%; */
`;

const Formulario = styled.form`
  display: flex;
  padding: 20px;
  margin-top: 5%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  border: solid 1px var(--borde-ligero);
  background-color: var(--color-4);
  box-shadow: var(--sombra-ligera);
  & span {
    font-weight: 700;
    font-size: 1.5rem;
  }
  & hr {
    width: 90%;
  }

  & button[type="submit"] {
    border: none;
    padding: 10px 30px;
    margin-top: 10px;
    border-radius: 10px;
    background: linear-gradient(70deg, var(--color-1), var(--color-2));
    color: var(--color-blanco);
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
  & > .msgError {
    font-size: 13px;
    color: var(--alerta-error);
  }
`;

// const BotonRegreso = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0px;
//   padding: 3px 10px 5px 5px;
//   border-radius: 0 0 15px 0;
//   background-color: var(--color-1);
//   & a {
//     text-decoration: none;
//     color: var(--color-blanco);
//   }
// `;
const ContenedorPagina = styled.div`
  position: relative;
  height: calc(100vh - var(--altura-header) - 1px);

  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
`;

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [cedulacelular, setCedulaCelular] = useState("");
  const [password, setPassword] = useState("");
  const [verificacion, setVerificacion] = useState(true);
  const [intentos, setIntentos] = useState(3);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const users = await VerificarUsuario(cedulacelular, password);
    // console.log(users);
    if (users.status===200) {
      if (users.data.exists === true) {
        const rol = users.data.rol;
        const nombre = users.data.nombre;
        console.log("Ingresado Correctamente");
        login(cedulacelular, rol, nombre);
        navigate("/");
      }
    } else {
      setVerificacion(false);
      setTimeout(() => {
        setVerificacion(true);
      }, 5000);
      console.log("Error de ingreso");
    }
  };

  return (
    <ContenedorPadre>
      <Header oculta={true} />
      <ContenedorPagina>
        <ContenedorLogin>
          <Formulario onSubmit={handleLogin}>
            <span>Bienvenido</span>
            <hr />
            {!verificacion && (
              <label className="msgError">* Credenciales no validas o usuario bloqueado</label>
            )}
            <InputFieldCustom
              onChange={setCedulaCelular}
              label={"Cédula/Celular (Ejem: +593XXXXXXXXX)"}
            />
            <InputFieldCustom
              onChange={setPassword}
              type={"password"}
              label={"Password"}
            />
            <button type="submit">Iniciar Sesión</button>
          </Formulario>
        </ContenedorLogin>
      </ContenedorPagina>
    </ContenedorPadre>
  );
}

export default Login;
