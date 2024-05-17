import { htmlTemplate1 } from "../components/template1.js";
import { minify } from "html-minifier";
import { htmlTemplate2 } from "../components/template2.js";
import chrome from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
export const pdfController = {
  generatePDF: async (req, res) => {
    try {
      const { dataJuego1, dataJuego2, dataInfo1, dataInfo2 } = req.body;
      const browser = await puppeteer.launch({
        ignoreDefaultArgs: ["--disable-extensions"],
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath(),
        headless: true,
        ignoreHTTPSErrors: true,
      });

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
        if (dataJuego.length > 0) {
          for (const chunk of dataJuego) {
            const htmlOrig = htmlTemplateFunc({
              dataJuego: chunk,
              dataInfo,
            });
            const htmlMinify = minify(htmlOrig, {
              removeComments: true,
              collapseWhitespace: true,
              minifyJS: true,
              minifyCSS: true,
            });
            htmls = htmls + htmlMinify;
          }
        }
      }
      if (dataJuego1.length === 0 && dataJuego2.length === 0) {
        return res.status(205).json({});
      } else {
        await generatePdfFromChunk(dataJuego1, dataInfo1, htmlTemplate1);
        await generatePdfFromChunk(dataJuego2, dataInfo2, htmlTemplate2);
        htmls = htmls + `</body></html>`;
        // pdfs.push(pdfBuffer);

        await page.setContent(htmls, { waitUntil: "networkidle0",timeout: 0 });
        const pdfBuffer = await page.pdf({
          format: "A4",
          printBackground: true,
        });
        console.log(pdfBuffer);
        await browser.close();
        res.contentType("application/pdf");
        return res.status(200).send(pdfBuffer);
      }

      // res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    }
  },
};
