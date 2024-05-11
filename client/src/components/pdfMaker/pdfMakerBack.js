import React, { useState } from "react";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import { jsPDF } from "jspdf";
import { HtmlTemplate1 } from "./Juego1Template";
import { HtmlTemplate2 } from "./Juego2Template";
import {
  ConsultarTablasSegunIDVenta,
  ObtenerDesNormal,
  ObtenerDesRapida,
} from "../../consultasBE/Tablas";
import styled from "styled-components";
import { ObtenerIDUsuario } from "../../consultasBE/User";
import { CrearPdf } from "../../consultasBE/Pdf";

const Boton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:disabled {
    background-color: #ffffff;
    color: black;
    cursor: default;
  }
`;

const GenerarPDFs1 = ({ idventa }) => {
  const [bloq, setBloq] = useState(false);

  const ConsultarDatos = async () => {
    if (bloq) return;
    setBloq(true);

    try {
      const res = await ConsultarTablasSegunIDVenta(idventa);
      if (res) {
        const dataTabla = res.data.data1;
        const dataTabla2 = res.data.data2;

        // Obtener datos adicionales para los PDFs
        const data1 = await obtenerDatosAdicionales(ObtenerDesNormal);
        const data2 = await obtenerDatosAdicionales(ObtenerDesRapida);

        const vendidoPor = await ObtenerIDUsuario(localStorage.getItem("id"));
        let nombreVend = "";
        console.log(vendidoPor);
        if (vendidoPor.status === 200) {
          nombreVend = vendidoPor.data.nombre;
        }
        console.log(nombreVend);

        if (typeof window !== "undefined") {
          // Asegura que esto se ejecute solo en el lado del cliente
          generatePdf(dataTabla, dataTabla2, data1, data2, nombreVend);
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

  const generatePdf = async (
    dataTabla,
    dataTabla2,
    data1,
    data2,
    nombreVend
  ) => {
    // if (data.length === 0) return;

    const dataChunks = chunkData(dataTabla, 4);
    const chunk = dataChunks[0];

    const result = await CrearPdf({ chunk, data1, nombreVend });
    if (result instanceof Error) {
      console.log("Failed to download PDF:", result);
    } else {
      console.log("PDF downloaded successfully!");
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
    <Boton disabled={bloq} onClick={ConsultarDatos}>
      {bloq ? "Descargando..." : "Descargar PDF Back"}
    </Boton>
  );
};

export default GenerarPDFs1;
