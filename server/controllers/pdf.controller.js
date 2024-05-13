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
          // console.log(htmlMinify);

          await page.setContent(htmlMinify, { waitUntil: "networkidle0" });
          const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
          });
          pdfs.push(pdfBuffer);
        }
      }
      await generatePdfFromChunk(dataJuego1, dataInfo1, htmlTemplate1);
      await generatePdfFromChunk(dataJuego2, dataInfo2, htmlTemplate2);

      const finalPdf = await combinePdfs(pdfs);
      // const finalPdf = Buffer.concat(pdfs);
      console.log(finalPdf);
      await browser.close();
      res.contentType("application/pdf");

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="combined.pdf"');
      res.send(finalPdf);
    } catch (error) {
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    }
  },
};
