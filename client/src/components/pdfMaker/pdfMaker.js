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

const GenerarPDFs = ({ idventa }) => {
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
        let nombreVend= "";
        console.log(vendidoPor);
        if(vendidoPor.status === 200){
          nombreVend= vendidoPor.data.nombre;
        }
        console.log(nombreVend);

        if (typeof window !== "undefined") {
          // Asegura que esto se ejecute solo en el lado del cliente
          generatePdf(dataTabla, dataTabla2, data1, data2,nombreVend);
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

  const generatePdf = (dataTabla, dataTabla2, data1, data2, nombreVend) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const processTable = async (data, chunkSize, template, info) => {
      if (data.length === 0) return;

      const dataChunks = chunkData(data, chunkSize);
      for (let index = 0; index < dataChunks.length; index++) {
        const chunk = dataChunks[index];
        const htmlString = ReactDOMServer.renderToString(
          template({ dataJuego: chunk, dataInfo: info, nombreRes:nombreVend })
        );
        const container = document.createElement("div");
        document.body.appendChild(container);
        container.innerHTML = htmlString;
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.style.width = "210mm";

        try {
          const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
          });
          const imgData = canvas.toDataURL("image/jpeg", 0.85);
          document.body.removeChild(container);
          if (index === 0 && pdf.internal.getNumberOfPages() === 0) {
            pdf.addImage(
              imgData,
              "JPEG",
              0,
              0,
              pdf.internal.pageSize.getWidth(),
              pdf.internal.pageSize.getHeight()
            );
          } else {
            pdf.addPage();
            pdf.addImage(
              imgData,
              "JPEG",
              0,
              0,
              pdf.internal.pageSize.getWidth(),
              pdf.internal.pageSize.getHeight()
            );
          }
        } catch (error) {
          console.error("Error generating PDF", error);
          throw error;
        }
      }
    };

    Promise.all([
      processTable(dataTabla, 4, HtmlTemplate1, data1),
      processTable(dataTabla2, 6, HtmlTemplate2, data2),
    ])
      .then(() => {
        if (pdf.internal.getNumberOfPages() > 1) {
          pdf.deletePage(1);
        }
        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "combined.pdf";
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("Error al finalizar la generación del PDF", err);
      });
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
      {bloq ? "Descargando..." : "Descargar PDF Combinado"}
    </Boton>
  );
};

export default GenerarPDFs;
