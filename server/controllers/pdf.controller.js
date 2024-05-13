import { htmlTemplate1 } from "../components/template1.js";
import { pool } from "../database.js";
import { ServerStyleSheet } from "styled-components";
import puppeteer from "puppeteer";
import { minify } from "html-minifier";
import { htmlTemplate2 } from "../components/template2.js";
import { PDFDocument } from "pdf-lib";

async function combinePdfs(pdfs) {
  console.log(pdfs);
  const mergedPdf = await PDFDocument.create();

  for (const pdfBytes of pdfs) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  return await mergedPdf.save();
}

export const pdfController = {
  generatePDF: async (req, res) => {
    try {
      const { dataJuego1, dataJuego2, dataInfo1, dataInfo2, nombreRes } =
        req.body;
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      const pdfs = [];
      let inicioHTML = ` <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
          * {
            box-sizing: border-box;
          }
          .contenedor-grid > span::after {
              content: "";
              margin-left: -10px;
          }
          .grid-cell:nth-child(5n) {
            border-right: none; 
          }
          
          .grid-cell:nth-child(-n + 5) {
            border-top: none; 
          }
          
          .grid-cell:nth-child(5n + 1) {
            border-left: none;
          }
          
          .grid-cell:nth-last-child(-n + 5) {
            border-bottom: none; 
          }
          
          .grid-cell.bottom-left {
            border-radius: 0 0 0 15px;
          }
          
          .grid-cell.bottom-right {
            border-radius: 0 0 15px 0;
          }
  
          .grid-cell-r:nth-child(3n) {
            border-right: none;
          }
          .grid-cell-r:nth-child(-n + 3) {
            border-top: none;
          }
          .grid-cell-r:nth-child(3n + 1) {
            border-left: none;
          }
          .grid-cell-r:nth-last-child(-n + 3) {
            border-bottom: none;
          }
          
      </style>
          <title>El Gran Bingo Chabelita</title>
        </head>
        <body style="width:100%;margin:0;display: flex;
        justify-content: center;
        align-items: center;flex-direction:column">`;
      let htmls = inicioHTML;

      async function generatePdfFromChunk(
        dataJuego,
        dataInfo,
        htmlTemplateFunc
      ) {
        for (const chunk of dataJuego) {
          const htmlOrig = htmlTemplateFunc({
            dataJuego: chunk,
            dataInfo,
            nombreRes,
          });
          const htmlMinify = minify(htmlOrig, {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
          });
          htmls = htmls + htmlMinify;
          // console.log(htmlMinify);
        }
      }
      await generatePdfFromChunk(dataJuego1, dataInfo1, htmlTemplate1);
      await generatePdfFromChunk(dataJuego2, dataInfo2, htmlTemplate2);
      htmls = htmls + `</body></html>`;
      // pdfs.push(pdfBuffer);
      console.log(htmls);

      await page.setContent(htmls, { waitUntil: "networkidle0" });
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
      });
      // const finalPdf = await combinePdfs(pdfs);
      // const finalPdf = Buffer.concat(pdfs);
      // console.log(finalPdf);
      // await browser.close();
      res.contentType("application/pdf");

      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader(
      //   "Content-Disposition",
      //   'attachment; filename="combined.pdf"'
      // );
      console.log(pdfBuffer);
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    }
  },
};
