import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import { jsPDF } from "jspdf";
import { HtmlTemplate1 } from "./Juego1Template";
import { HtmlTemplate2 } from "./Juego2Template";
import { dataTabla } from "../../pages/UserPages/data";
import { dataTabla2 } from "../../pages/UserPages/data";
import { ConsultarTablasSegunIDVenta } from "../../consultasBE/Tablas";
// const chunkData = (data, chunkSize) => {
//   let results = [];
//   for (let i = 0; i < data.length; i += chunkSize) {
//     results.push(data.slice(i, i + chunkSize));
//   }
//   return results;
// };

// const GeneratePdfButton1 = () => {

//   const generatePdf = () => {
//     const dataChunks = chunkData(dataTabla, 4);

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//       hotfixes: ["px_scaling"],
//     });
//     // Convertir el componente React a HTML usando ReactDOMServer
//     dataChunks.forEach((chunk, index) => {
//       // Renderiza el HTML para cada chunk de datos
//       const htmlString = ReactDOMServer.renderToString(
//         htmlTemplate1({ dataJuego: chunk })
//       );
//       const container = document.createElement("div");
//       container.innerHTML = htmlString;
//       container.style.width = "210mm";
//       document.body.appendChild(container);

//       html2canvas(container, { scale: 2, useCORS: true })
//         .then((canvas) => {
//           const imgData = canvas.toDataURL("image/png");
//           if (index > 0) {
//             pdf.addPage(); // Añadir una nueva página si es necesario
//           }
//           const pageWidth = pdf.internal.pageSize.getWidth();
//           const pageHeight = pdf.internal.pageSize.getHeight();
//           pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

//           if (index === dataChunks.length - 1) {
//             // Guardar el PDF después del último chunk
//             pdf.save("juego1.pdf");
//             document.body.removeChild(container);
//           }
//         })
//         .catch((err) => {
//           console.error("Error generating PDF", err);
//         });
//     });
//   };

//   return <button onClick={generatePdf}>Descargar Juego1</button>;
// };

// const GeneratePdfButton2 = () => {

//   const generatePdf = () => {
//     const dataChunks = chunkData(dataTabla2, 6);

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//       hotfixes: ["px_scaling"],
//     });
//     // Convertir el componente React a HTML usando ReactDOMServer
//     dataChunks.forEach((chunk, index) => {
//       // Renderiza el HTML para cada chunk de datos
//       const htmlString = ReactDOMServer.renderToString(
//         htmlTemplate2({ dataJuego: chunk })
//       );
//       const container = document.createElement("div");
//       container.innerHTML = htmlString;
//       container.style.width = "210mm";
//       document.body.appendChild(container);

//       html2canvas(container, { scale: 2, useCORS: true })
//         .then((canvas) => {
//           const imgData = canvas.toDataURL("image/png");
//           if (index > 0) {
//             pdf.addPage(); // Añadir una nueva página si es necesario
//           }
//           const pageWidth = pdf.internal.pageSize.getWidth();
//           const pageHeight = pdf.internal.pageSize.getHeight();
//           pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

//           if (index === dataChunks.length - 1) {
//             // Guardar el PDF después del último chunk
//             pdf.save("rapidin.pdf");
//             document.body.removeChild(container);
//           }
//         })
//         .catch((err) => {
//           console.error("Error generating PDF", err);
//         });
//     });
//   };

//   return <button onClick={generatePdf}>Descargar Juego2</button>;
// };

// const GenerarPDFs = () => {
//   return (
//     <div>
//       <GeneratePdfButton1 />
//       <GeneratePdfButton2 />
//     </div>
//   );
// };

const GenerarPDFs = ({ idventa }) => {
  const ConsultarDatos = async () => {
    const res = await ConsultarTablasSegunIDVenta(idventa);
    let dataTabla = [],
      dataTabla2 = [];
    if (res) {
      console.log(res.data);
      dataTabla = res.data.data1;
      dataTabla2 = res.data.data2;
      generatePdf(dataTabla, dataTabla2);
    } else {
      return;
    }
  };

  const chunkData = (data, chunkSize) => {
    let results = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      results.push(data.slice(i, i + chunkSize));
    }
    return results;
  };

  const generatePdf = (dataTabla, dataTabla2) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      hotfixes: ["px_scaling"],
    });
    const processTable = (data, chunkSize, template) => {
      console.log(data);
      if (data.length === 0) return; // Si no hay datos, no procesar esta tabla
      const dataChunks = chunkData(data, chunkSize);

      dataChunks.forEach((chunk, index) => {
        const htmlString = ReactDOMServer.renderToString(
          template({ dataJuego: chunk })
        );
        const container = document.createElement("div");
        container.innerHTML = htmlString;
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.style.width = "210mm";
        document.body.appendChild(container);

        html2canvas(container, { scale: 2, useCORS: true })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            document.body.removeChild(container); // Limpiar el contenedor inmediatamente después de usarlo
            // Añadir la imagen al PDF
            // Verificar si es necesario añadir una nueva página
            if (index === 0 && pdf.internal.getNumberOfPages() === 0) {
              // Si es el primer chunk y no hay páginas, añadir la imagen directamente
              const pageWidth = pdf.internal.pageSize.getWidth();
              const pageHeight = pdf.internal.pageSize.getHeight();
              pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
            } else {
              // Para otros chunks o si ya se había añadido la primera imagen, añadir página antes de la imagen
              pdf.addPage();
              const pageWidth = pdf.internal.pageSize.getWidth();
              const pageHeight = pdf.internal.pageSize.getHeight();
              pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
            }

            // Guardar el PDF después del último chunk de la última tabla
            if (data === dataTabla2 && index === dataChunks.length - 1) {
              if (pdf.internal.getNumberOfPages() > 1) {
                pdf.deletePage(1);
              }
              pdf.save("combined.pdf");
            }
          })
          .catch((err) => {
            console.error("Error generating PDF", err);
          });
      });
    };

    // Procesar cada tabla
    processTable(dataTabla, 4, HtmlTemplate1);
    processTable(dataTabla2, 6, HtmlTemplate2);
  };

  return <button onClick={ConsultarDatos}>Descargar PDF Combinado</button>;
};

export default GenerarPDFs;
