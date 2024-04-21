import React, { useRef } from "react";
import html2canvas from "html2canvas";
import ReactDOMServer from 'react-dom/server';
import { jsPDF } from "jspdf";
import { htmlTemplate1 } from "./Juego2Template";

// export const htmlTemplate1 = `
// <div class="page">
//   <div class="header">
//     <h1>Premio de $10000</h1>
//     <div>Licuadora Licuadora Licuadora Licuadora Licuadora Licuadora</div>
//     <div>BINGO CHABELITA</div>
//   </div>

//   <div class="bingo-container">
//     <div class="bingo-card">
//       <h2>Tabla #202342</h2>
//       <!-- Contenido de la tabla de bingo -->
//     </div>
//     <!-- ... Repetir para otras tarjetas ... -->
//   </div>

//   <div class="footer">
//     CÓDIGO DE HOJA: ***@#**#***
//   </div>
// </div>
// `;

const GeneratePdfButton = () => {
    const generatePdf = () => {
      // Convertir el componente React a HTML usando ReactDOMServer
      const htmlString = ReactDOMServer.renderToString(htmlTemplate1());
  
      // Crear un contenedor para el HTML
      const container = document.createElement("div");
      container.innerHTML = htmlString; // Insertar el HTML
      container.style.width = "210mm";
      document.body.appendChild(container); // Agregar al DOM
  
      // Generar el PDF
      html2canvas(container, { scale: 2, useCORS: true })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            hotfixes: ["px_scaling"],
          });
  
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
  
          // Añadir la imagen escalada al PDF
          pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
          pdf.save("downloaded.pdf");
  
          // Limpiar el DOM
          document.body.removeChild(container);
        })
        .catch((err) => {
          console.error("Error generating PDF", err);
        });
    };
  
    return <button onClick={generatePdf}>Descargar PDF</button>;
  };

export default GeneratePdfButton;
