import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import {
  ConsultarTablasSegunIDTabla,
  ObtenerJugadas,
  ObtenerTablasGanadoras,
  ObtenerTablasGanadorasRapida,
  ObtenerTablasLetrasGanadoras,
} from "../../consultasBE/Tablas";
import { EstructuraTabla1 } from "../UserPages/EstructuraTabla1";
import { EstructuraTabla2 } from "../UserPages/EstructuraTabla2";

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

const Contenedor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  & > .buscarCodigo {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;
const Contenedor2 = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  & > .datos {
    max-width: 200px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: var(--sombra-intensa);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const InputField = styled.input`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
`;
const ButtonVerif = styled.button`
  outline: none;
  padding: 6px 10px;
  background-color: var(--color-4);

  border: solid 1px var(--color-2);
  color: var(--color-2);
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;

const VerificarCodigo = ({ codigo, setCodigo }) => {
  const [verif, setVerif] = useState(false);
  const [seConsulto, setSeConsulto] = useState(false);
  const [data, setData] = useState([]);
  const [letraTabla, setLetraTabla] = useState("");
  const [numerosLlenados, setNumerosLlenados] = useState(null);
  const [letrasFormadas, setLetrasFormadas] = useState("");
  const [jugada, setJugada] = useState(null);
  const [pasadas, setPasadas] = useState("");
  // const [jugada,setJugada]=useState(null)
  const findNumeralByCode = (code, data) => {
    for (const item of data) {
      if (item.datos.includes(code)) {
        return item.numeral;
      }
    }
    return 0; // Return null if the code is not found
  };
  const findPositionsByCode = (code, data) => {
    const positions = data
      .filter((array) => array.includes(code))
      .map((array) => array[0]);

    return positions.join(", ");
  };
  const BuscarTabla = async () => {
    setVerif(true);
    setNumerosLlenados(null);
    setLetrasFormadas("");
    const resp = await ConsultarTablasSegunIDTabla(codigo);
    console.log(resp);
    setSeConsulto(true);

    const ConsultarJugadas = async () => {
      const res = await ObtenerJugadas();
      // console.log(res);
      if (!res) {
        return null;
      } else {
        return res[0];
      }
    };

    if (resp.data) {
      // console.log(resp);

      let dat = resp.data.data;
      console.log(resp.data);
      setPasadas(resp.data.cadena)

      console.log(dat);
      if (dat.length > 0) {
        setData(dat);
        let lT = dat[0].numtabla.charAt(0);
        setLetraTabla(lT);

        const jugada = await ConsultarJugadas();
        setJugada(jugada);
        let tdeJ = jugada.tipo_juego;
        // console.log(jugada);
        if (jugada.estado === "I") {
          let res = [];
          // console.log(lT);
          if (tdeJ === 0 && lT === "N") {
            res = await ObtenerTablasGanadoras();
            if (res) {
              const encontro = findNumeralByCode(codigo, res);
              setNumerosLlenados(encontro);
            }
          } else if (tdeJ === 1 && lT === "R") {
            res = await ObtenerTablasGanadorasRapida();
            if (res) {
              const encontro = findNumeralByCode(codigo, res);
              setNumerosLlenados(encontro);
            }
          }

          if (tdeJ === 0 && lT === "N") {
            const res1 = await ObtenerTablasLetrasGanadoras();
            if (res1.data1.length > 0) {
              const cadena = findPositionsByCode(codigo, res1.ganadas);
              setLetrasFormadas(cadena);
            }
          }
        }
        // console.log(dat);
      }
    }

    setVerif(false);
  };

  const handleCodigoChange = (value) => {
    let cod = value.toUpperCase();
    setCodigo(cod);
    limpiar();
  };

  const limpiar = () => {
    setVerif(false);
    setSeConsulto(false);
    setLetraTabla("");
    setJugada(null);
    setData([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <Contenedor1>
        <div className="buscarCodigo">
          Código:
          <InputField
            type="text"
            value={codigo}
            onChange={(e) => handleCodigoChange(e.target.value)}
          />
          {codigo.length > 5 && (
            <ButtonVerif onClick={BuscarTabla}>
              {verif ? "Buscando..." : "Verificar"}
            </ButtonVerif>
          )}
        </div>
      </Contenedor1>
      {seConsulto &&
        (data.length > 0 ? (
          <Contenedor1>
            Tabla Encontrada
            <Contenedor2>
              <div>
                {letraTabla === "N" ? (
                  <EstructuraTabla1 dataTables={data[0]} />
                ) : (
                  <EstructuraTabla2 dataTables={data[0]} />
                )}
              </div>

              {((jugada !== null &&
                letraTabla === "N" &&
                jugada.tipo_juego === 0) ||
                (jugada !== null &&
                  letraTabla === "R" &&
                  jugada.tipo_juego === 1)) &&
                (numerosLlenados !== null ? (
                  <div className="datos">
                    <span>
                      {numerosLlenados !== 0
                        ? `${numerosLlenados} números en tabla`
                        : numerosLlenados === "GANADORAS"
                        ? "TABLA LLENA"
                        : `${
                            letraTabla === "N"
                              ? "La tabla aun no llega a tener más de 20 números llenados"
                              : "La tabla aun no llega a tener más de 5 números llenados"
                          }`}
                    </span>
                    {letraTabla === "N" && (
                      <span>
                        {letrasFormadas === ""
                          ? "No se han formado letras"
                          : `Letras Formadas: ${letrasFormadas}`}
                      </span>
                    )}
                    {pasadas !== "" && <span>{pasadas}</span>}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2px",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      style={{ width: "30px" }}
                      src={`${process.env.REACT_APP_URL_CLIENT}/Blocks.svg`}
                      alt=""
                    />
                    <span>Cargando Análisis...</span>
                  </div>
                ))}
            </Contenedor2>
          </Contenedor1>
        ) : (
          <Contenedor1>
            No se encontro una tabla con el codigo: {codigo}
          </Contenedor1>
        ))}
    </div>
  );
};

const ConsultarTablasEnVivo = () => {
  const [codigoConsulta, setCodigoConsulta] = useState("");
  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Verifica el código aquí</h1>
        <VerificarCodigo
          codigo={codigoConsulta}
          setCodigo={setCodigoConsulta}
        ></VerificarCodigo>
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default ConsultarTablasEnVivo;
