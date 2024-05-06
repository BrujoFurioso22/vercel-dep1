import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import { jsPDF } from "jspdf";
import { HtmlTemplate1 } from "./Juego1Template";
import { HtmlTemplate2 } from "./Juego2Template";
import { dataTabla } from "../../pages/UserPages/data";
import { dataTabla2 } from "../../pages/UserPages/data";
import { ConsultarTablasSegunIDVenta } from "../../consultasBE/Tablas";
import styled from "styled-components";
import html2pdf from "html2pdf.js";

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

// Función para dividir los datos en bloques
const chunkData = (data, chunkSize) => {
  const results = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    results.push(data.slice(i, i + chunkSize));
  }
  return results;
};

// Función para generar el PDF con `html2pdf`
const generatePdf = async (dataTabla, dataTabla2) => {
  // Crear un contenedor temporal para todas las tablas
  const container = document.createElement("div");

  // Agregar bloques de dataTabla
  const chunks1 = chunkData(dataTabla, 4);
  chunks1.forEach(chunk => {
    const div = document.createElement("div");
    div.innerHTML = HtmlTemplate1({ dataJuego: chunk });
    container.appendChild(div);
  });

  // Agregar bloques de dataTabla2
  const chunks2 = chunkData(dataTabla2, 6);
  chunks2.forEach(chunk => {
    const div = document.createElement("div");
    div.innerHTML = HtmlTemplate2({ dataJuego: chunk });
    container.appendChild(div);
  });

  // Agregar el contenedor al DOM temporalmente
  document.body.appendChild(container);

  const options = {
    margin: 1,
    filename: 'combined.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().from(container).set(options).save();
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    if (container.parentNode) container.parentNode.removeChild(container); // Limpiar el DOM
  }
};

const GenerarPDFs1 = ({ idventa }) => {
  const [bloq, setBloq] = useState(false);

  const ConsultarDatos = async () => {
    if (bloq) return;

    setBloq(true);
    try {
      const res = await ConsultarTablasSegunIDVenta(idventa);
      let dataTabla = [],
        dataTabla2 = [];
      if (res) {
        dataTabla = res.data.data1;
        dataTabla2 = res.data.data2;
        await generatePdf(dataTabla, dataTabla2);
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setBloq(false);
    }
  };

  return (
    <Boton disabled={bloq} onClick={ConsultarDatos}>
      {bloq ? "Descargando..." : "Descargar PDF Combinado"}
    </Boton>
  );
};

export default GenerarPDFs1;