import { htmlTemplate1 } from "../components/template1.js";
import { pool } from "../database.js";
import { ServerStyleSheet } from "styled-components";
import puppeteer from "puppeteer";
import { minify } from "html-minifier";

export const pdfController = {
  generatePDF: async (req, res) => {
    try {
      // console.log("Hola");
      const { dataJuego, dataInfo, nombreRes } = req.body; // Asegúrate de recibir estos datos correctamente desde el cliente

      const htmlOrig = htmlTemplate1({ dataJuego, dataInfo, nombreRes });
      const htmlMinify = minify(htmlOrig, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      });

      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      await page.setContent(htmlMinify, {
        waitUntil: "domcontentloaded",
      });
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true
      });

      // await browser.close();

      // // Aquí puedes optar por enviar el PDF directamente al cliente o guardar en un archivo
      res.contentType("application/pdf");
      res.send(pdf); // Enviar PDF como buffer directamente
    } catch (error) {
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    }
  },
};
