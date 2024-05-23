import { htmlTemplate1 } from "../components/template1.js";
import { minify } from "html-minifier";
import { htmlTemplate2 } from "../components/template2.js";
// import chrome from "@sparticuz/chromium";
import Chromium from "@sparticuz/chromium";
// import puppeteer from "puppeteer-core";
// import puppeteer from "puppeteer";
import puppeteer from "puppeteer-core";
import archiver from "archiver";
import { PassThrough } from "stream";
import { Readable } from "stream";
import { PDFDocument } from "pdf-lib";
import { JSDOM } from "jsdom";

import { createPool } from "generic-pool";

import Api2Pdf from "api2pdf";

const a2pClient = new Api2Pdf("3b577cc7-e2f6-4ce3-ad16-7c018b6736f4");

const puppeteerFactory = {
  create: async () => {
    const executablePath = await Chromium.executablePath();
    return puppeteer.launch({
      args: Chromium.args,
      defaultViewport: Chromium.defaultViewport,
      executablePath: executablePath,
      headless: Chromium.headless,
    });
  },
  destroy: (browser) => {
    return browser.close();
  },
};

const puppeteerPool = createPool(puppeteerFactory, {
  max: 10, // Número máximo de instancias en el pool
  min: 5, // Número mínimo de instancias en el pool
  idleTimeoutMillis: 500000,
  evictionRunIntervalMillis: 300000,
});

export const pdfController = {
  generatePDF: async (req, res) => {
    let browser;
    try {
      const { dataJuego1, dataJuego2, dataInfo1, dataInfo2 } = req.body;
      const totalLength = dataJuego1.length + dataJuego2.length;
      browser = await puppeteer.launch({
        args: Chromium.args,
        defaultViewport: Chromium.defaultViewport,
        executablePath: await Chromium.executablePath(),
        headless: Chromium.headless,
        ignoreHTTPSErrors: true,
        protocolTimeout: 500000,
      });
      // const browser = await puppeteer.launch({
      //   headless: "new",
      // });

      const page = await browser.newPage();
      const pdfBuffers = [];

      async function generatePdfFromChunks(chunks, templateFunc, dataInfo) {
        let html = `<!DOCTYPE html>
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
          <body style="width:100%; margin:0; display: flex; justify-content: center; align-items: center; flex-direction:column">`;

        for (const chunk of chunks) {
          const htmlChunk = templateFunc({ dataJuego: chunk, dataInfo });
          html += minify(htmlChunk, {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
          });
        }
        html += `</body></html>`;

        await page.setContent(html);
        const pdfBuffer = await page.pdf({
          format: "A4",
          printBackground: true,
          timeout: 500000,
        });
        return pdfBuffer;
      }

      // async function generatePdfFromChunk(
      //   dataJuego,
      //   dataInfo,
      //   htmlTemplateFunc
      // ) {
      //   if (dataJuego.length > 0) {
      //     for (const chunk of dataJuego) {
      //       const htmlOrig = htmlTemplateFunc({
      //         dataJuego: chunk,
      //         dataInfo,
      //       });
      //       const htmlMinify = minify(htmlOrig, {
      //         removeComments: true,
      //         collapseWhitespace: true,
      //         minifyJS: true,
      //         minifyCSS: true,
      //       });
      //       htmls = htmls + htmlMinify;
      //     }
      //   }
      // }
      if (totalLength === 0) {
        await browser.close();
        return res.status(205).json({});
      } else {
        const chunkSize = 35;
        let chunks1 = [];
        let chunks2 = [];
        for (let i = 0; i < dataJuego1.length; i += chunkSize) {
          chunks1.push(dataJuego1.slice(i, i + chunkSize));
        }
        console.log(chunks1);

        for (let i = 0; i < dataJuego2.length; i += chunkSize) {
          chunks2.push(dataJuego2.slice(i, i + chunkSize));
        }

        for (const chunk of chunks1) {
          const pdfBuffer = await generatePdfFromChunks(
            chunk,
            htmlTemplate1,
            dataInfo1
          );
          pdfBuffers.push({
            buffer: pdfBuffer,
            name: `BINGO_TABLONES_${pdfBuffers.length}.pdf`,
          });
        }

        for (const chunk of chunks2) {
          const pdfBuffer = await generatePdfFromChunks(
            chunk,
            htmlTemplate2,
            dataInfo2
          );
          pdfBuffers.push({
            buffer: pdfBuffer,
            name: `BINGO_LA_UNICA_${pdfBuffers.length}.pdf`,
          });
        }
        console.log(pdfBuffers);
        if (pdfBuffers.length > 1) {
          const zipStream = new PassThrough();
          const archive = archiver("zip", { zlib: { level: 9 } });

          archive.on("error", async function (err) {
            await browser.close();
            next(err);
          });

          zipStream.on("end", async function () {
            await browser.close();
          });

          res.setHeader("Content-Type", "application/zip");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=generated_pdfs.zip"
          );
          zipStream.pipe(res);

          archive.pipe(zipStream);

          for (const pdf of pdfBuffers) {
            archive.append(pdf.buffer, { name: pdf.name });
          }

          await archive.finalize();
        } else {
          console.log("Entre en el IF");
          let pdfBuffer = pdfBuffers[0].buffer;
          console.log(pdfBuffers[0].buffer);
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=generated.pdf"
          );
          await browser.close();

          // Convertir el buffer a ArrayBuffer
          const arrayBuffer = pdfBuffer.buffer.slice(
            pdfBuffer.byteOffset,
            pdfBuffer.byteOffset + pdfBuffer.byteLength
          );

          console.log(arrayBuffer);
          res.status(200).end(Buffer.from(arrayBuffer));
        }
      }

      // res.send(pdfBuffer);
    } catch (error) {
      if (browser) await browser.close();
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    }
  },
  generatePDFSimple: async (req, res) => {
    let browser = null;
    try {
      const { dataJuego1, dataJuego2, dataInfo1, dataInfo2 } = req.body;
      browser = await puppeteerPool.acquire();
      // const browser = await puppeteer.launch({
      //   headless: "new",
      // });

      const page = await browser.newPage();
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
        <body style="width:100%;
        margin:0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column">`;
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
        await page.close();
        await puppeteerPool.release(browser);
        return res.status(205).json({});
      } else {
        await generatePdfFromChunk(dataJuego1, dataInfo1, htmlTemplate1);
        await generatePdfFromChunk(dataJuego2, dataInfo2, htmlTemplate2);
        htmls = htmls + `</body></html>`;
        // pdfs.push(pdfBuffer);

        await page.setContent(htmls);

        const pdfBuffer = await page.pdf({
          format: "A4",
          printBackground: true,
          timeout: 500000,
        });

        await page.close();
        await puppeteerPool.release(browser);

        // console.log(pdfBuffer);
        // await browser.close();
        res.setHeader("Content-Type", "application/pdf");

        // return res.status(200).json({pdf: pdfBuffer, html:htmls});
        return res.status(200).send(pdfBuffer);
      }

      // res.send(pdfBuffer);
    } catch (error) {
      if (browser) {
        try {
          await puppeteerPool.release(browser);
        } catch (releaseError) {
          console.error("Error releasing browser", releaseError);
        }
      }
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    }
  },
  generatePDF_HTML_API: async (req, res) => {
    // let browser;
    try {
      const { dataJuego1, dataJuego2, dataInfo1, dataInfo2 } = req.body;
      // browser = await puppeteer.launch({
      //   args: Chromium.args,
      //   defaultViewport: Chromium.defaultViewport,
      //   executablePath: await Chromium.executablePath(),
      //   headless: Chromium.headless,
      //   ignoreHTTPSErrors: true,
      //   protocolTimeout: 500000,
      // });
      // const browser = await puppeteer.launch({
      //   headless: "new",
      // });

      // const page = await browser.newPage();
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
        <body style="width:100%;
        margin:0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column">`;
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
        // await browser.close();
        return res.status(205).json({});
      } else {
        await generatePdfFromChunk(dataJuego1, dataInfo1, htmlTemplate1);
        await generatePdfFromChunk(dataJuego2, dataInfo2, htmlTemplate2);
        htmls = htmls + `</body></html>`;
        const htmlsM = minify(htmls, {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        });
        var options = {
          pageSize: "A4",
          printBackground: true,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
        };
        await a2pClient
          .chromeHtmlToPdf(htmls, { options: options })
          .then(function (result) {
            console.log(result);

            return res.status(200).json({ pdf: result });
          });
        // pdfs.push(pdfBuffer);

        // await page.setContent(htmls);

        // const pdfBuffer = await page.pdf({
        //   format: "A4",
        //   printBackground: true,
        //   timeout: 500000,
        // });

        // console.log(pdfBuffer);
        // await browser.close();
        // res.setHeader("Content-Type", "application/pdf");

        // return res.status(200).json({pdf: pdfBuffer, html:htmls});
      }

      // res.send(pdfBuffer);
    } catch (error) {
      // if (browser) await browser.close();
      console.error("Error generating PDF", error);
      res.status(500).send("Error generating PDF");
    }
  },
};
