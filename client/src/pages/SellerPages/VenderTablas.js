import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";

// const ContenedorPadre = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   position: relative;
//   width: 100%;
// `;

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
`;

const FormulariodeVenta = styled.form`
  background-color: var(--color-4);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  .seccionVenta {
    padding: 10px;
    display: flex;
    gap: 10px;
    & > label {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
`;
const VentanaEmergente = styled.div`
  position: absolute;
  background-color: var(--color-6);
  top: 0;
  width: 100%;
  border-radius: 10px;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .modal {
    & > * {
      width: 100%;
    }
    background-color: var(--color-negro-bajo);
    margin-top: 30px;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: var(--sombra-intensa);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    & > .titulo {
      font-size: 1.4rem;
      font-weight: 700;
    }
  }

  .contenedorBotones {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    width: 100%;
    & > button {
      padding: 5px 10px;
      border: none;
      outline: none;
      border-radius: 5px;
      cursor: pointer;
      &.cancelar {
        border: solid 2px var(--alerta-error);
        color: var(--alerta-error);
      }
      &.confirmar {
        border: solid 2px var(--alerta-exito);
        color: var(--alerta-exito);
      }
    }
  }
`;

const InputField = styled.input`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
`;
const SelectCampo = styled.select`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
`;

const BotonSubmit = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-1);
  color: var(--color-blanco);
  margin-top: 15px;
  cursor: pointer;
`;

const ContenedorContenido = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Modal = ({ isOpen, onClose, onConfirm, datos }) => {
  if (!isOpen) return null;

  return (
    <VentanaEmergente>
      <div className="modal">
        <span className="titulo">Confirmar Venta</span>
        <hr />
        {/* Muestra la información ingresada aquí */}
        <span>Tipo de identificación: {datos.tipoIdentificacion}</span>
        <span>Identificación: {datos.identificacion}</span>
        <span>Nombre del comprador: {datos.nombreComprador}</span>
        <ul>
          {datos.juegosSeleccionados.map((juego) => (
            <li key={juego}>{`${juego}: ${datos.cantidades[juego]}`}</li>
          ))}
        </ul>
        <div className="contenedorBotones">
          <button className="cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirmar" onClick={onConfirm}>
            Confirmar Venta
          </button>
        </div>
      </div>
    </VentanaEmergente>
  );
};

const FormularioVenta = () => {
  const [etapa, setEtapa] = useState(1);
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [nombreComprador, setNombreComprador] = useState("");
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Asignación de juegos para simplificar el ejemplo
  const juegos = ["Juego 1", "Juego 2"];

  // useEffect para avanzar a la etapa 2
  useEffect(() => {
    if (tipoIdentificacion && identificacion.length > 10) {
      setEtapa(2); // Avanzar a la etapa de ingresar el nombre del comprador
    }
  }, [tipoIdentificacion, identificacion]);

  // useEffect para avanzar a la etapa 3
  useEffect(() => {
    if (etapa === 2 && nombreComprador.length > 5) {
      setEtapa(3); // Avanzar a la etapa de seleccionar juegos
    }
  }, [nombreComprador, etapa]);

  // useEffect para avanzar a la etapa 4
  useEffect(() => {
    if (etapa === 3 && juegosSeleccionados.length > 0) {
      setEtapa(4); // Avanzar a la etapa de ingresar cantidades
    }
  }, [juegosSeleccionados, etapa]);

  // Funciones para manejar el estado...

  // Registro de la venta
  const registrarVenta = (e) => {
    e.preventDefault();
    // Lógica para registrar la venta...
    setModalIsOpen(true);
  };

  const handleJuegoSeleccionado = (juego) => {
    setJuegosSeleccionados((prevJuegos) => {
      if (prevJuegos.includes(juego)) {
        return prevJuegos.filter((j) => j !== juego);
      } else {
        return [...prevJuegos, juego];
      }
    });
  };
  const handleCantidadChange = (juego, cantidad) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [juego]: cantidad,
    }));
  };

  const handleChangeTipoId = (value) => {
    setTipoIdentificacion(value);
    setIdentificacion("");
  };

  const todasLasCantidadesValidas = () =>
    juegosSeleccionados.every((juego) => cantidades[juego] > 1);

  const confirmarVenta = () => {
    setModalIsOpen(false);
    // Aquí se manejaría la confirmación de la venta
  };
  return (
    <ContenedorContenido>
      <FormulariodeVenta onSubmit={registrarVenta}>
        <span style={{ fontWeight: "700", fontSize:"1.5rem", textAlign: "center", width: "100%", display:"flex",justifyContent:"center"}}>
          Vender Cartillas
        </span>
        {etapa >= 1 && (
          <div
            className="seccionVenta"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>
              Tipo de identificación:
              <SelectCampo
                value={tipoIdentificacion}
                onChange={(e) => handleChangeTipoId(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="cedula">Cédula</option>
                <option value="telefono">Teléfono</option>
              </SelectCampo>
            </label>
            {tipoIdentificacion !== "" && (
              <label>
                {tipoIdentificacion === "cedula" ? "Cédula:" : "Teléfono:"}
                <InputField
                  type="text"
                  value={identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                />
              </label>
            )}
          </div>
        )}

        {etapa >= 2 && (
          <div className="seccionVenta">
            <label>
              Nombre del comprador:
              <InputField
                type="text"
                value={nombreComprador}
                onChange={(e) => setNombreComprador(e.target.value)}
              />
            </label>
          </div>
        )}

        {etapa >= 3 && (
          <div className="seccionVenta">
            <fieldset>
              <legend>¿Qué juegos quiere comprar?</legend>
              {juegos.map((juego) => (
                <label key={juego}>
                  <InputField
                    type="checkbox"
                    checked={juegosSeleccionados.includes(juego)}
                    onChange={() => handleJuegoSeleccionado(juego)}
                  />
                  {juego}
                </label>
              ))}
            </fieldset>
          </div>
        )}

        {etapa === 4 &&
          juegosSeleccionados.map((juego) => (
            <div key={juego} className="seccionVenta">
              <label>
                {`Cantidad de ${juego}:`}
                <InputField
                  type="number"
                  value={cantidades[juego] || ""}
                  onChange={(e) => handleCantidadChange(juego, e.target.value)}
                  min="1"
                />
              </label>
            </div>
          ))}

        {etapa === 4 && todasLasCantidadesValidas() && (
          <BotonSubmit type="submit">Registrar Venta</BotonSubmit>
        )}
      </FormulariodeVenta>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={confirmarVenta}
        datos={{
          tipoIdentificacion,
          identificacion,
          nombreComprador,
          juegosSeleccionados,
          cantidades,
        }}
      />
    </ContenedorContenido>
  );
};

const VenderTablas = () => {
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <div style={{ height: "100%" }}>
          <FormularioVenta />
        </div>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default VenderTablas;
