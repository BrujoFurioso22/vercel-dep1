import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import {
  ObtenerDesNormal,
  ObtenerDesRapida,
  UpdateTablaNormalDes,
  UpdateTablaRapidaDes,
} from "../../consultasBE/Tablas";

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
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
`;

const ContenedorMenor = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const ContenedorMenor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  display: flex;
  gap: 20px;
`;

const ContenedorGrid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  gap: 20px;
  .fila {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    width: fit-content;
  }

  .col-derecha {
    text-align: right;
  }

  .col-izquierda {
    text-align: left;
  }
`;

const FormulariodeVenta = styled.form`
  background-color: var(--color-7);
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
    flex-direction: column;
    justify-content: center;
    & > .titulo {
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
    }
  }
  .gridDatos {
    display: grid;
    grid-template-columns: 1fr 1fr; /* O 1fr 1fr, dependiendo de cómo desees distribuir el espacio */
    align-items: start;
    gap: 10px;
    padding: 10px;
    width: 100%; /* Divide el contenedor en dos columnas */
    .dato {
      display: contents; /* Esto permite que cada span actúe como si estuviera directamente en la grilla */
      .dato1 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
      }
    }
  }

  .contenedorBotones {
    display: flex;
    grid-column: 1 / -1;
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

const CuadroInfo = ({ data1, data2, handleChange1, handleChange2 }) => {
  const [guardar, setGuardar] = useState(0);
  const [validacionVacios, setValidacionVacios] = useState("");
  const handleArrayChange1 = (col, value, maxLetras) => {
    if (col === "letras") {
      // Filtrar caracteres no deseados
      let sanitizedValue = value.replace(/[^A-Z]/gi, "").toUpperCase();
      // Convertir la cadena en un arreglo de caracteres únicos
      let uniqueChars = Array.from(new Set(sanitizedValue.split("")));

      // Limitar el número de caracteres permitidos
      let limitedChars = uniqueChars.slice(0, maxLetras);

      handleChange1(col, limitedChars); // Actualiza el estado
    } else {
      const arreglo =
        value ==="" ? [] : value.split(",").map((item) => item.trim());
      handleChange1(col, arreglo);
    }
  };
  const handleChangeNumLetras = (col, value) => {
    if (value >= 4 && value <= 7) {
      handleChange1("letras", []);
      handleChange1(col, value);
    }
  };
  const handlePremiosChange2 = (value) => {
    const premiosArray = value.split(",").map((item) => item.trim());
    handleChange2("premios", premiosArray);
  };
  const verificarDatosCompletos = (data) => {
    // Lista de claves que pueden estar vacías
    const clavesOpcionales = ["premios"];

    // Iterar sobre cada clave en el objeto data
    for (const clave of Object.keys(data)) {
      // Chequear si la clave no es opcional
      if (!clavesOpcionales.includes(clave)) {
        // Si el valor es una cadena o un arreglo, verifica si está vacío
        if (typeof data[clave] === "string" || Array.isArray(data[clave]) || typeof data[clave] ==="number") {
          if (data[clave].length === 0) {
            return false;
          }
        }
        // Si el valor es otro tipo (número, objeto, etc.), verifica si es nulo o indefinido
        else if (data[clave] == null) {
          return false;
        }
      }
    }

    // Si todos los campos requeridos están llenos, devuelve true
    return true;
  };
  const guardarCambios = async () => {
    const datosCompletosData1 = verificarDatosCompletos(data1);
    const datosCompletosData2 = verificarDatosCompletos(data2);
    if (datosCompletosData1 === false || datosCompletosData2 === false) {
      setValidacionVacios("Por favor, llene todos los campos.");
    } else {
      setValidacionVacios("");

      setGuardar(1);
      let premios1 = data1.premios.length === 0 ? "" : data1.premios.join(",");
      let letras1 = data1.letras;
      const res = await UpdateTablaNormalDes({
        contenido: data1.contenido,
        premio1: parseFloat(data1.premio1),
        premio2: parseFloat(data1.premio2),
        premio3: parseFloat(data1.premio3),
        premios: premios1,
        fecha_hora: data1.fecha_hora,
        cantidad_letras: parseInt(data1.cantidad_letras),
        letras: letras1.join(","),
        premio_letras: parseFloat(data1.premio_letra)
      });
      const res1 = await UpdateTablaRapidaDes({
        contenido: data2.contenido,
        premio1: parseFloat(data2.premio1),
        fecha_hora: data2.fecha_hora,
      });
      if (res.data.ok && res1.data.ok) {
        setGuardar(2);
        setTimeout(() => {
          setGuardar(0);
        }, 5000);
      } else {
        setGuardar(3);
        setTimeout(() => {
          setGuardar(0);
        }, 5000);
      }
    }
  };
  return (
    <ContenedorMenor>
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ContenedorMenor1>
          <ContenedorGrid>
            <h3 style={{ margin: "0" }}>Juego Tablón</h3>
            <div className="fila">
              <span className="col-derecha">Contenido:</span>
              <span className="col-izquierda">
                <InputField
                  value={data1.contenido}
                  type="text"
                  onChange={(e) => handleChange1("contenido", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 1:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={data1.premio1}
                  type="number"
                  onChange={(e) => handleChange1("premio1", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 2:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={data1.premio2}
                  type="number"
                  onChange={(e) => handleChange1("premio2", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 3:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={data1.premio3}
                  type="number"
                  onChange={(e) => handleChange1("premio3", e.target.value)}
                />
              </span>

              <span className="col-derecha">
                Letras:
                <InputField
                  style={{ maxWidth: "40px" }}
                  type="number"
                  min={3}
                  max={7}
                  value={data1.cantidad_letras}
                  onChange={(e) =>
                    handleChangeNumLetras("cantidad_letras", e.target.value)
                  }
                />
              </span>
              
              <span className="col-izquierda">
                <InputField
                  value={data1.letras.join("-")}
                  onChange={(e) =>
                    handleArrayChange1(
                      "letras",
                      e.target.value,
                      data1.cantidad_letras
                    )
                  }
                />
              </span>
              <span className="col-derecha">Premio Letras:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={data1.premio_letra}
                  type="number"
                  onChange={(e) => handleChange1("premio_letra", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premios:</span>
              <span className="col-izquierda">
                <InputField
                  value={data1.premios === "" ? [] : data1.premios.join(",")}
                  onChange={(e) =>
                    handleArrayChange1("premios", e.target.value)
                  }
                />
              </span>
              {/* <span className="col-derecha">Fecha y Hora:</span>
                <span className="col-izquierda">
                  <InputField
                    value={dato.fecha}
                    type="date"
                    onChange={(e) => handleChange1(0, "fecha", e.target.value)}
                  />
                </span> */}
              <span className="col-derecha">Fecha y Hora:</span>
              <span className="col-izquierda">
                <InputField
                  value={data1.fecha_hora}
                  type="datetime-local"
                  onChange={(e) => handleChange1("fecha_hora", e.target.value)}
                />
              </span>
            </div>
          </ContenedorGrid>
        </ContenedorMenor1>
        <ContenedorMenor1>
          <ContenedorGrid>
            <h3 style={{ margin: "0" }}>Juego La Única</h3>

            <div className="fila">
              <span className="col-derecha">Contenido:</span>
              <span className="col-izquierda">
                <InputField
                  value={data2.contenido}
                  type="text"
                  onChange={(e) => handleChange2("contenido", e.target.value)}
                />
              </span>
              <span className="col-derecha">Premio 1:</span>
              <span className="col-izquierda">
                {"$"}
                <InputField
                  value={data2.premio1}
                  type="number"
                  onChange={(e) => handleChange2("premio1", e.target.value)}
                />
              </span>
              {/* <span className="col-derecha">Fecha:</span>
                <span className="col-izquierda">
                  <InputField
                    value={dato.fecha}
                    onChange={(e) => handleChange2(0, "fecha", e.target.value)}
                  />
                </span>
                <span className="col-derecha">Hora:</span>
                <span className="col-izquierda">
                  <InputField
                    value={dato.hora}
                    onChange={(e) => handleChange2(0, "hora", e.target.value)}
                  />
                </span> */}
              <span className="col-derecha">Fecha y Hora:</span>
              <span className="col-izquierda">
                <InputField
                  value={data2.fecha_hora}
                  type="datetime-local"
                  onChange={(e) => handleChange2("fecha_hora", e.target.value)}
                />
              </span>
            </div>
          </ContenedorGrid>
        </ContenedorMenor1>
      </div>
      {validacionVacios !== "" && (
        <span style={{ fontSize: "14px", color: "red" }}>
          {validacionVacios}
        </span>
      )}
      {guardar === 0 ? (
        <BotonSubmit onClick={() => guardarCambios()}>
          Guardar Cambios
        </BotonSubmit>
      ) : guardar === 1 ? (
        <span>Guardando...</span>
      ) : guardar === 2 ? (
        <span>
          Guardado Correctamente <i className="bi bi-check2-circle" />
        </span>
      ) : (
        <span>
          Ha ocurrido un error <i className="bi bi-x-octagon" />
        </span>
      )}
    </ContenedorMenor>
  );
};
const EditarInformacion = () => {
  const [data1, setData1] = useState({
    contenido: "",
    premio1: "",
    premio2: "",
    premio3: "",
    premios: [],
    cantidad_letras: 4,
    letras: [],
    premio_letra:"",
    fecha_hora: "",
  });
  const [data2, setData2] = useState({
    contenido: "",
    premio1: "",
    fecha_hora: "",
  });

  const handleChange1 = (attr, value) => {
    setData1((prevData) => ({
      ...prevData,
      [attr]: value,
    }));
  };
  const handleChange2 = (attr, value) => {
    setData2((prevData) => ({
      ...prevData,
      [attr]: value,
    }));
  };

  const ConsultarDatos = async () => {
    const res = await ObtenerDesNormal();
    if (res.data) {
      setData1(res.data.data);
    }
    const res1 = await ObtenerDesRapida();
    if (res1.data) {
      setData2(res1.data.data);
    }
  };
  useEffect(() => {
    ConsultarDatos();
  }, []);

  return (
    <ContenedorContenido>
      <CuadroInfo
        data1={data1}
        data2={data2}
        handleChange1={handleChange1}
        handleChange2={handleChange2}
      />
    </ContenedorContenido>
  );
};

const EditInfoTemplates = () => {
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <div style={{ height: "100%" }}>
          <EditarInformacion />
        </div>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default EditInfoTemplates;
