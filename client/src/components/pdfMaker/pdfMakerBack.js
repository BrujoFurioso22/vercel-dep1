import React, { useState } from "react";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import { jsPDF } from "jspdf";
import { HtmlTemplate1 } from "./Juego1Template";
import { HtmlTemplate2 } from "./Juego2Template";
import {
  ConsultarTablasSegunIDVenta,
  ConsultarTablasdelCliente,
  ObtenerDesNormal,
  ObtenerDesRapida,
} from "../../consultasBE/Tablas";
import styled from "styled-components";
import { ObtenerIDUsuario } from "../../consultasBE/User";
import { CrearPdf } from "../../consultasBE/Pdf";

const Boton = styled.div`
  padding: 4px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
  }
  &.disabled {
    background-color: #ffffff;
    color: black;
    cursor: default;
  }
`;

const GenerarPDFs1 = ({ idventa, tipo = 0 }) => {
  const [bloq, setBloq] = useState(false);
  const [error, setError] = useState(false);
  const ConsultarTablasCliente = async () => {
    const cccliente = localStorage.getItem("id");
    const res = await ConsultarTablasdelCliente({ cccliente: cccliente });
    if (!res) {
    } else {
      return { data: { data1: res[0], data2: res[1] } };
    }
  };
  const ConsultarTablasClienteMandandoCC = async ({idventa}) => {
    const res = await ConsultarTablasdelCliente({ cccliente: idventa });
    if (!res) {
    } else {
      return { data: { data1: res[0], data2: res[1] } };
    }
  };

  const ConsultarDatos = async () => {
    setError(false);
    if (bloq) return;
    setBloq(true);

    try {
      let res;
      if (tipo === 0) {
        res = await ConsultarTablasSegunIDVenta(idventa);
      } else if (tipo === 1) {
        res = await ConsultarTablasClienteMandandoCC({idventa});
      } else {
        res = await ConsultarTablasCliente();
      }
      if (res) {
        const dataTabla = res.data.data1;
        const dataTabla2 = res.data.data2;

        // Obtener datos adicionales para los PDFs
        const data1 = await obtenerDatosAdicionales(ObtenerDesNormal);
        const data2 = await obtenerDatosAdicionales(ObtenerDesRapida);

        // const vendidoPor = await ObtenerIDUsuario(localStorage.getItem("id"));
        // let nombreVend = "";
        // console.log(vendidoPor);
        // if (vendidoPor.status === 200) {
        //   nombreVend = vendidoPor.data.nombre;
        // }
        // console.log(nombreVend);

        if (data1.length === 0 && data2.length === 0) {
          setError(true);
        } else {
          if (typeof window !== "undefined") {
            // Asegura que esto se ejecute solo en el lado del cliente
            await generatePdf(dataTabla, dataTabla2, data1, data2);
          }
        }
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setBloq(false);
    }
  };

  const obtenerDatosAdicionales = async (funcionObtener) => {
    const res = await funcionObtener();
    if (res) {
      // Verifica si existe el campo 'premios' y lo procesa adecuadamente
      let info = { ...res.data.data };
      if (info.premios) {
        info.premios = limpiarArreglo(info.premios);
      }
      return [info];
    }
    return [];
  };

  const limpiarArreglo = (arreglo) => {
    return arreglo.filter((item) => item.trim() !== "");
  };

  const generatePdf = async (dataTabla, dataTabla2, data1, data2) => {
    // if (data.length === 0) return;

    const dataChunks1 = chunkData(dataTabla, 4);
    const dataChunks2 = chunkData(dataTabla2, 6);
    // console.log(dataChunks);
    // const chunk = dataChunks[0];

    const result = await CrearPdf({
      dataJuego1: dataChunks1,
      dataJuego2: dataChunks2,
      dataInfo1: data1,
      dataInfo2: data2,
    });
    if (result) {
      console.log("PDF downloaded successfully!");
    } else {
      setError(true);
    }
  };

  const chunkData = (data, chunkSize) => {
    let results = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      results.push(data.slice(i, i + chunkSize));
    }
    return results;
  };

  return (
    <Boton className={bloq && "disabled"} onClick={ConsultarDatos}>
      {error ? (
        <span>Error al Descargar</span>
      ) : bloq ? (
        <span>
          {" "}
          <img
            style={{ width: "30px" }}
            src={`${process.env.REACT_APP_URL_CLIENT}/Blocks.svg`}
            alt=""
          />
          {"Descargando... "}
        </span>
      ) : (
        "PDF"
      )}
    </Boton>
  );
};

export default GenerarPDFs1;
