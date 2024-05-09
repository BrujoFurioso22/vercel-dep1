import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import { jsPDF } from "jspdf";
import { HtmlTemplate1 } from "./Juego1Template";
import { HtmlTemplate2 } from "./Juego2Template";
import { dataTabla } from "../../pages/UserPages/data";
import { dataTabla2 } from "../../pages/UserPages/data";
import {
  ConsultarTablasSegunIDVenta,
  ObtenerDesNormal,
  ObtenerDesRapida,
} from "../../consultasBE/Tablas";
import styled from "styled-components";

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
    if (bloq) return; // Evita doble clic

    setBloq(true);
    try {
      const res = await ConsultarTablasSegunIDVenta(idventa);
      let dataTabla = [],
        dataTabla2 = [];
      if (res) {
        console.log(res.data);
        dataTabla = res.data.data1;
        dataTabla2 = res.data.data2;
        let data1 = [],
          data2 = [];
        const ConsultarDatos = async () => {
          const resN = await ObtenerDesNormal();
          if (resN) {
            function limpiarArreglo(arreglo) {
              return arreglo.filter((item) => item.trim() !== "");
            }
            let bo = {
              ...resN.data.data,
              premios: limpiarArreglo(resN.data.data.premios),
            };
            data1 = [bo];
          }

          const resR = await ObtenerDesRapida();
          if (resR) {
            data2 = [resR.data.data];
            console.log(data2);
          }
        };
        await ConsultarDatos();
        console.log(data1);
        // console.log(data2);
        await generatePdf(dataTabla, dataTabla2, data1, data2);
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setBloq(false); // Siempre restablece el estado, incluso en caso de error
    }
  };

  const chunkData = (data, chunkSize) => {
    let results = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      results.push(data.slice(i, i + chunkSize));
    }
    return results;
  };

  const generatePdf = (dataTabla, dataTabla2, data1, data2) => {
    return new Promise((resolve, reject) => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const processTable = (data, chunkSize, template, info) => {
        // console.log(data);
        if (data.length === 0) return; // Si no hay datos, no procesar esta tabla
        const dataChunks = chunkData(data, chunkSize);

        dataChunks.forEach((chunk, index) => {
          const htmlString = ReactDOMServer.renderToString(
            template({ dataJuego: chunk, dataInfo: info })
          );
          const container = document.createElement("div");
          container.innerHTML = htmlString;
          container.style.position = "absolute";
          container.style.left = "-9999px";
          container.style.top = "-9999px";
          container.style.width = "210mm";
          document.body.appendChild(container);

          html2canvas(container, { scale: 1, useCORS: true })
            .then((canvas) => {
              const imgData = canvas.toDataURL("image/jpeg", 0.85);
              document.body.removeChild(container); // Limpiar el contenedor inmediatamente después de usarlo
              // Añadir la imagen al PDF
              // Verificar si es necesario añadir una nueva página
              if (index === 0 && pdf.internal.getNumberOfPages() === 0) {
                // Si es el primer chunk y no hay páginas, añadir la imagen directamente
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
              } else {
                // Para otros chunks o si ya se había añadido la primera imagen, añadir página antes de la imagen
                pdf.addPage();
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
              }

              // Guardar el PDF después del último chunk de la última tabla
              if (data === dataTabla2 && index === dataChunks.length - 1) {
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
                resolve();
              }
            })
            .catch((err) => {
              console.error("Error generating PDF", err);
              reject(err);
            });
        });
      };

      // Procesar cada tabla
      processTable(dataTabla, 4, HtmlTemplate1, data1);
      processTable(dataTabla2, 6, HtmlTemplate2, data2);
    });
  };

  return (
    <Boton disabled={bloq} onClick={ConsultarDatos}>
      {bloq ? "Descargando..." : "Descargar PDF Combinado"}
    </Boton>
  );
};

export default GenerarPDFs;
