import { Router } from "express";
import { pdfController } from "../controllers/pdf.controller.js";

export const pdfRouter = Router();

pdfRouter.post("/generarPDF", pdfController.generatePDF_HTML_API);
