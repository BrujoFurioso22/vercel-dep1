import { htmlTemplate1 } from "../components/template1.js";
import { htmlTemplate2 } from "../components/template2.js";
import { minify } from "html-minifier";
import chromium from "chrome-aws-lambda";

export const pdfController = {
  generatePDF: async (req, res) => {
    let browser = null;
    let page = null;
    try {
      const { dataJuego1, dataJuego2, dataInfo1, dataInfo2 } = req.body;

      // Configuración de Puppeteer con chrome-aws-lambda
      browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });

      page = await browser.newPage();
      const pdfs = [];
      let inicioHTML = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { box-sizing: border-box; }
              .contenedor-grid > span::after { content: ""; margin-left: -10px; }
              .grid-cell:nth-child(5n) { border-right: none; }
              .grid-cell:nth-child(-n + 5) { border-top: none; }
              .grid-cell:nth-child(5n + 1) { border-left: none; }
              .grid-cell:nth-last-child(-n + 5) { border-bottom: none; }
              .grid-cell.bottom-left { border-radius: 0 0 0 15px; }
              .grid-cell.bottom-right { border-radius: 0 0 15px 0; }
              .grid-cell-r:nth-child(3n) { border-right: none; }
              .grid-cell-r:nth-child(-n + 3) { border-top: none; }
              .grid-cell-r:nth-child(3n + 1) { border-left: none; }
              .grid-cell-r:nth-last-child(-n + 3) { border-bottom: none; }
            </style>
            <title>El Gran Bingo Chabelita</title>
          </head>
          <body style="width:100%;margin:0;display: flex; justify-content: center; align-items: center;flex-direction:column">`;
      let htmls = inicioHTML;

      async function generatePdfFromChunk(dataJuego, dataInfo, htmlTemplateFunc) {
        if (dataJuego.length > 0) {
          for (const chunk of dataJuego) {
            const htmlOrig = htmlTemplateFunc({ dataJuego: chunk, dataInfo });
            const htmlMinify = minify(htmlOrig, {
              removeComments: true,
              collapseWhitespace: true,
              minifyJS: true,
              minifyCSS: true,
            });
            htmls += htmlMinify;
          }
        }
      }

      if (dataJuego1.length === 0 && dataJuego2.length === 0) {
        return res.status(205).json({});
      } else {
        await generatePdfFromChunk(dataJuego1, dataInfo1, htmlTemplate1);
        await generatePdfFromChunk(dataJuego2, dataInfo2, htmlTemplate2);
        htmls += `</body></html>`;

        await page.setContent(htmls, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

        res.contentType("application/pdf");
        return res.status(200).send(pdfBuffer);
      }
    } catch (error) {
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    } finally {
      if (page) await page.close();
      if (browser) await browser.close();
    }
  },
};
