import { htmlTemplate1 } from "../components/template1.js";
import { pool } from "../database.js";
import { ServerStyleSheet } from "styled-components";
import puppeteer from "puppeteer";

export const pdfController = {
  generatePDF: async (req, res) => {
    try {
      // console.log(req);
      const { dataJuego, dataInfo, nombreRes } = req.body; // Asegúrate de recibir estos datos correctamente desde el cliente

      console.log(htmlTemplate1({ dataJuego, dataInfo, nombreRes }));
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(htmlTemplate1({ dataJuego, dataInfo, nombreRes }), {
        waitUntil: "networkidle0",
      });
      const pdf = await page.pdf({ format: "A4" });

      await browser.close();

      // Aquí puedes optar por enviar el PDF directamente al cliente o guardar en un archivo
      res.contentType("application/pdf");
      res.send(pdf); // Enviar PDF como buffer directamente
    } catch (error) {
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    } 
  },
};
